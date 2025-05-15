import React from "react";

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps): JSX.Element {
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold mr-2 text-orange-800">Score:</div>
      <div className="text-2xl font-bold text-orange-600 flex items-center">
        {score}
        <span className="ml-2 text-yellow-500" style={{ fontSize: '18px' }}>
          {score > 0 ? '🏆' : ''}
        </span>
      </div>
    </div>
  );
}
