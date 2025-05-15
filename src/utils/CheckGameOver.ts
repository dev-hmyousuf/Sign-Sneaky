import { Coordinate } from "../types/types";

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: { xMin: number; xMax: number; yMin: number; yMax: number },
  snakeBody: Coordinate[]
): boolean => {
  // Check boundary collision
  const boundaryCollision = 
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax;
  
  // Check self collision (skip the head)
  const selfCollision = snakeBody.slice(1).some(
    segment => segment.x === snakeHead.x && segment.y === snakeHead.y
  );
  
  return boundaryCollision || selfCollision;
};