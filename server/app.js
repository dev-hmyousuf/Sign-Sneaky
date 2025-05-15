import express from "express";
import cors from "cors";
import leaderboardRouter from "./routes/leaderboard.js";

const app = express();

// Configure CORS to accept all origins in production
app.use(cors({
  origin: '*',  // Allow all origins for now
  credentials: true
}));

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use("/api/leaderboard", leaderboardRouter);

export default app;
