import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Direction, Coordinate } from '../types/types';
import { checkEatsFood } from '../utils/CheckEatsFood';
import { checkGameOver } from '../utils/CheckGameOver';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Food from './Game/Food';
import Header from './Game/Header';
import Score from './Game/Score';
import Snake from './Game/Snake';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useGesture } from '@use-gesture/react';

const SNAKE_INITIAL_POSITION: Coordinate[] = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION: Coordinate = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 61 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 1;

export default function Game(): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(MOVE_INTERVAL);

  const { user } = useUser();
  const { client } = useClerk();

  // Generate food in a position not occupied by the snake
  const generateFood = useCallback(() => {
    let newFood: Coordinate;
    let foodOnSnake = true;

    // Keep generating until we find a position not on the snake
    while (foodOnSnake) {
      newFood = randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax);
      foodOnSnake = snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
    }

    return newFood;
  }, [snake]);

  useEffect(() => {
    if (isGameOver) return;

    const intervalId = setInterval(() => {
      if (!isPaused) moveSnake();
    }, gameSpeed);

    return () => clearInterval(intervalId);
  }, [snake, isGameOver, isPaused, direction, gameSpeed]);

  const moveSnake = useCallback(() => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
    }

    // Pass the entire snake body to check for self-collision
    if (checkGameOver(newHead, GAME_BOUNDS, snake)) {
      setIsGameOver(true);
      updateGamePoints(score);
      return;
    }

    if (checkEatsFood(newHead, food, 2)) {
      // Generate food in a position not occupied by the snake
      setFood(generateFood());
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);

      // Increase game speed slightly as score increases
      if (score > 0 && score % 5 === 0) {
        setGameSpeed((prevSpeed) => Math.max(prevSpeed - 2, 30)); // Don't go faster than 30ms
      }
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  }, [snake, direction, food, score, generateFood]);

  // Ref for the game board
  const gameBoardRef = useRef<HTMLDivElement>(null);

  // Prevent pull-to-refresh
  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventPullToRefresh, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  // Prevent arrow key scrolling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return;

      // Prevent scrolling when using arrow keys or space
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(
          event.key
        )
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowUp':
          if (direction !== Direction.Down) setDirection(Direction.Up);
          break;
        case 'ArrowDown':
          if (direction !== Direction.Up) setDirection(Direction.Down);
          break;
        case 'ArrowLeft':
          if (direction !== Direction.Right) setDirection(Direction.Left);
          break;
        case 'ArrowRight':
          if (direction !== Direction.Left) setDirection(Direction.Right);
          break;
        case ' ': // Space bar to pause/resume
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameOver]);

  // Setup swipe gestures
  useGesture(
    {
      onDrag: ({ movement: [mx, my], dragging }) => {
        if (isGameOver || !dragging) return;

        // Determine swipe direction based on the largest movement
        const absX = Math.abs(mx);
        const absY = Math.abs(my);

        // Minimum swipe threshold
        const threshold = 10;

        if (Math.max(absX, absY) < threshold) return;

        if (absX > absY) {
          // Horizontal swipe
          if (mx > 0) {
            // Swipe right
            if (direction !== Direction.Left) setDirection(Direction.Right);
          } else {
            // Swipe left
            if (direction !== Direction.Right) setDirection(Direction.Left);
          }
        } else {
          // Vertical swipe
          if (my > 0) {
            // Swipe down
            if (direction !== Direction.Up) setDirection(Direction.Down);
          } else {
            // Swipe up
            if (direction !== Direction.Down) setDirection(Direction.Up);
          }
        }
      },
    },
    {
      target: gameBoardRef,
      eventOptions: { passive: false },
      drag: {
        filterTaps: true,
        threshold: 10,
      },
    }
  );

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused((prev) => !prev);
  };

  const updateGamePoints = async (newPoints: number) => {
    if (!user) return;

    try {
      const currentPoints = (user.unsafeMetadata?.gamePoints as number) || 0;
      const updatedPoints = currentPoints + newPoints;

      await user.update({
        unsafeMetadata: { gamePoints: updatedPoints },
      });

      await user.reload();

      console.log('Game points updated:', updatedPoints);
    } catch (error) {
      console.error('Failed to update game points:', error);
    }
  };

  // Add these state variables for touch handling
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      // Horizontal swipe
      if (Math.abs(distanceX) < minSwipeDistance) return;
      if (distanceX > 0) {
        // Swipe left
        if (direction !== Direction.Right) setDirection(Direction.Left);
      } else {
        // Swipe right
        if (direction !== Direction.Left) setDirection(Direction.Right);
      }
    } else {
      // Vertical swipe
      if (Math.abs(distanceY) < minSwipeDistance) return;
      if (distanceY > 0) {
        // Swipe up
        if (direction !== Direction.Down) setDirection(Direction.Up);
      } else {
        // Swipe down
        if (direction !== Direction.Up) setDirection(Direction.Down);
      }
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-200 flex flex-col justify-center items-center select-none touch-none py-2">
      <div className="w-[95%] max-w-2xl mx-auto">
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={isPaused}
        >
          <Score score={score} />
        </Header>
        <div
          ref={gameBoardRef}
          className="relative h-[650px] w-full border-12 rounded-b-[30px] overflow-hidden shadow-2xl touch-none"
          style={{
            borderColor: '#ea580c', // orange-600
            background:
              'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fff7ed 100%)',
            backgroundImage:
              'radial-gradient(circle, rgba(234,88,12,0.05) 10%, transparent 10%)',
            backgroundSize: '20px 20px',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />

          {/* Game Over Screen */}
          {isGameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-10 backdrop-blur-sm animate-fadeIn">
              <div className="text-orange-500 font-game text-[38px] mb-6 animate-bounce drop-shadow-glow">
                Game Over
              </div>
              <div className="text-white text-2xl mb-8 flex items-center">
                Your Score:{' '}
                <span className="text-yellow-400 ml-3 font-bold">{score}</span>
                {score > 10 && <span className="ml-3 text-2xl">🏆</span>}
              </div>
              <button
                onClick={reloadGame}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg font-bold text-xl"
              >
                Play Again
              </button>
            </div>
          )}

          {/* Pause Screen */}
          {isPaused && !isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10">
              <div className="text-white font-bold text-[36px] animate-pulse drop-shadow-glow">
                Paused
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-orange-800 bg-white bg-opacity-80 px-8 py-4 rounded-full shadow-md mx-auto max-w-md">
          <p className="hidden md:block mb-1">
            Use arrow keys to move. Press Space to pause/resume.
          </p>
          <p className="block md:hidden">
            On mobile, swipe to control the snake.
          </p>
        </div>
      </div>
    </div>
  );
}
