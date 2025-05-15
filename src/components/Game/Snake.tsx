// Remove React import if not using JSX transform
import { Coordinate } from '../../types/types';

interface SnakeProps {
  snake: Coordinate[];
}

// Change JSX.Element to React.ReactElement
export default function Snake({ snake }: SnakeProps): React.ReactElement {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;
        // Calculate color based on position in snake body
        const getSegmentColor = () => {
          if (isHead) return 'bg-orange-600';
          // Alternate between two shades for body segments
          return index % 2 === 0 ? 'bg-orange-500' : 'bg-orange-400';
        };

        return (
          <div
            key={`${segment.x}-${segment.y}`}
            className={`absolute ${getSegmentColor()}`}
            style={{
              width: isHead ? '14px' : '12px',
              height: isHead ? '14px' : '12px',
              left: `${segment.x * 10 - (isHead ? 2 : 1)}px`,
              top: `${segment.y * 10 - (isHead ? 2 : 1)}px`,
              borderRadius: isHead ? '50%' : '4px',
              zIndex: isHead ? 2 : 1,
              transition: 'all 0.1s ease',
              boxShadow: isHead ? '0 0 3px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {isHead && (
              <>
                {/* Snake eyes */}
                <div
                  className="absolute bg-white rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    top: '3px',
                    left: '3px',
                    boxShadow: '0 0 1px rgba(0,0,0,0.5)',
                  }}
                ></div>
                <div
                  className="absolute bg-white rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    top: '3px',
                    right: '3px',
                    boxShadow: '0 0 1px rgba(0,0,0,0.5)',
                  }}
                ></div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
