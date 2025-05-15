// Remove React import if not using JSX transform
interface ScoreProps {
  score: number;
}

// Change JSX.Element to React.ReactElement
export default function Score({ score }: ScoreProps): React.ReactElement {
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
