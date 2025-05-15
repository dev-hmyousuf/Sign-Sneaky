import express from "express";
import cors from "cors";
import leaderboardRouter from "./routes/leaderboard.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/leaderboard", leaderboardRouter);

export default app;
