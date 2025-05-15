
import React, { useEffect, useState } from "react";

function getRandomFruitEmoji() {
  const fruitEmojis = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍍", "🍒", "🥭"];
  const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
  return fruitEmojis[randomIndex];
}

interface FoodProps {
  x: number;
  y: number;
}

export default function Food({ x, y }: FoodProps): JSX.Element {
  const [emoji, setEmoji] = useState(getRandomFruitEmoji());
  
  // Change food emoji when position changes
  useEffect(() => {
    setEmoji(getRandomFruitEmoji());
  }, [x, y]);

  return (
    <div
      className="absolute flex items-center justify-center animate-pulse"
      style={{
        width: "24px",
        height: "24px",
        left: `${x * 10 - 7}px`,
        top: `${y * 10 - 7}px`,
        fontSize: "20px",
        zIndex: 10,
        filter: "drop-shadow(0 0 3px rgba(234,88,12,0.7))",
        transform: "rotate(0deg)",
        animation: "pulse 1.5s infinite, wiggle 2s ease-in-out infinite alternate",
      }}
    >
      {emoji}
    </div>
  );
}
