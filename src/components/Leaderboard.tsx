import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

type User = {
  id: string;
  name: string;
  image?: string;
  gamePoints: number;
};

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Use environment variable or fallback to localhost
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await fetch(`${API_URL}/api/leaderboard`);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch leaderboard: ${response.status} ${errorText}`);
        }

        const users = await response.json();
        setLeaderboard(users);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        // If API fails, show empty leaderboard
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-orange-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-8 mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Leaderboard</h1>
      
      {leaderboard.length === 0 ? (
        <div className="text-center py-10 bg-orange-50 rounded-xl border-2 border-orange-200">
          <div className="text-5xl mb-4">🏆</div>
          <p className="text-xl text-orange-800 mb-2">No scores yet!</p>
          <p className="text-orange-600">Be the first to play and set a high score.</p>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl overflow-hidden border-2 border-orange-200">
          <div className="bg-orange-600 text-white py-3 px-4 flex items-center font-bold">
            <span className="w-10 text-center">#</span>
            <span className="flex-1 ml-4">Player</span>
            <span className="w-24 text-right">Score</span>
          </div>
          
          <ul className="divide-y divide-orange-200">
            {leaderboard.map((player, index) => (
              <li
                key={player.id}
                className={`flex items-center py-4 px-4 ${player.id === user?.id ? 'bg-orange-100' : ''} hover:bg-orange-50 transition-colors`}
              >
                <span className="text-lg font-bold text-orange-800 w-10 text-center">{index + 1}</span>
                
                <div className="flex items-center flex-1">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-10 h-10 rounded-full mr-4 object-cover border-2 border-orange-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full mr-4 bg-orange-200 flex items-center justify-center text-orange-600 font-bold border-2 border-orange-300">
                      {player.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-orange-900 font-medium">{player.name || "Unknown"}</span>
                </div>
                
                <span className="text-orange-600 font-bold w-24 text-right flex items-center justify-end">
                  <span className="mr-2">🍎</span> {player.gamePoints}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-orange-500 italic">Keep playing to improve your score!</p>
        {/* Fix the empty ReactNode issue by adding null or undefined */}
        {user && (
          <div className="mt-4 p-3 bg-orange-50 rounded-full inline-block border border-orange-200">
            <span className="text-orange-700">Your best score: </span>
            <span className="font-bold text-orange-600">{user.unsafeMetadata?.gamePoints || 0}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
