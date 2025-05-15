import React, { useEffect, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: React.ReactNode;
  isPaused: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps) {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const { user } = useUser();
  const totalScore = user?.unsafeMetadata?.gamePoints || 0;

  // Example update check logic for web (replace with real check)
  useEffect(() => {
    // Simulate update available
    // setShowUpdatePrompt(true);
  }, []);

  const handleUpdate = () => {
    alert("Update functionality is not implemented for web.");
    setShowUpdatePrompt(false);
  };

  return (
    <div className="flex flex-row items-center justify-between h-28 px-6 py-4 border-12 border-orange-600 rounded-t-[30px] bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 shadow-lg relative">
      {/* Update Prompt Modal */}
      {showUpdatePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4/5 max-w-md p-6 bg-white rounded-xl shadow-2xl transform transition-all animate-fadeIn">
            <h2 className="mb-4 text-2xl font-bold text-center text-orange-600">
              নতুন আপডেট উপলব্ধ 🚀
            </h2>
            <p className="mb-6 text-gray-600 text-center">
              উন্নত ফিচার এবং বাগ ফিক্স সহ নতুন সংস্করণ ইনস্টল করুন।
            </p>
            <div className="flex justify-between">
              <button 
                onClick={handleUpdate}
                className="px-5 py-2 font-bold text-white bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 transition-all hover:scale-105"
              >
                আপডেট করুন
              </button>
              <button 
                onClick={() => setShowUpdatePrompt(false)}
                className="px-5 py-2 font-bold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all hover:scale-105"
              >
                পরে দেখব
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-3 order-1 sm:order-none">
        <button 
          onClick={reloadGame} 
          className="p-2 sm:p-3 bg-white bg-opacity-90 rounded-full shadow-lg hover:scale-110 transition-all duration-300 active:scale-95 border-2 border-orange-200"
          aria-label="Reload Game"
        >
          <MdRestartAlt size={20} className="text-orange-600 sm:size-24" />
        </button>

        <button 
          onClick={pauseGame} 
          className="p-2 sm:p-3 bg-white bg-opacity-90 rounded-full shadow-lg hover:scale-110 transition-all duration-300 active:scale-95 border-2 border-orange-200"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <FaPlayCircle size={20} className="text-orange-600 sm:size-24" />
          ) : (
            <FaPauseCircle size={20} className="text-orange-600 sm:size-24" />
          )}
        </button>
      </div>

      <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full shadow-md border-2 border-orange-200 min-w-[100px] sm:min-w-[120px] text-center order-2 sm:order-none">
        <span className="text-xs sm:text-sm font-bold text-orange-700">Total Score</span>
        <div className="text-base sm:text-lg font-bold text-orange-600">{totalScore?.toString()}</div>
      </div>

      <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full shadow-md border-2 border-orange-200 min-w-[80px] sm:min-w-[100px] text-center order-3 sm:order-none">
        {children}
      </div>
    </div>
  );
}
