import express from "express";
import cors from "cors";
import leaderboardRouter from "./routes/leaderboard.js";

const app = express();

// Configure CORS for both development and production
const allowedOrigins = [
  'http://localhost:5173',  // Local development frontend
  'https://your-frontend-url.com', // Replace with your actual frontend URL when deployed
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use("/api/leaderboard", leaderboardRouter);

export default app;
