import {
  GoogleOneTap,
  SignIn,
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
        <Navbar /> {/* ✅ Now inside <Router> */}

        <Routes>
          {/* Public Routes */}
          <Route path="/tos" element={<Tos />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>

        <SignedOut>
          <div className='flex justify-center items-center h-screen '>

          <SignIn />
          <GoogleOneTap />
          </div>
        </SignedOut>

        <SignedIn>
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
