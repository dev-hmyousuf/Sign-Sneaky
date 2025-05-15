import express from "express";
import cors from "cors";
import leaderboardRouter from "./routes/leaderboard.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Railway backend! 🛤️");
});
app.use("/api/leaderboard", leaderboardRouter);

export default app;
