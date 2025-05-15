import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.clerk.com/v1/users?limit=100&offset=0&order_by=-created_at",
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const users = await response.json();

    const topUsers = users
      .map(user => ({
        id: user.id,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        image: user.image_url,
        gamePoints: user.unsafe_metadata?.gamePoints || 0,
      }))
      .sort((a, b) => b.gamePoints - a.gamePoints)
      .slice(0, 10);

    res.json(topUsers);
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

export default router;
