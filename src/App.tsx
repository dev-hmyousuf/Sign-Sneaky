import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Tos from './components/Tos';
import Privacy from './components/Privacy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-200">
        <Routes>
          {/* Public Routes */}
          <Route path="/tos" element={<Tos />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>

        <SignedOut>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
              <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Snake Game</h1>
              <p className="text-gray-600 mb-6 text-center">Please sign in to play the game</p>
              <div className="flex justify-center">
                <SignInButton mode="modal" />
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/game" />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* Add other authenticated routes as needed */}
          </Routes>
        </SignedIn>
      </div>
    </Router>
  );
}

export default App;
