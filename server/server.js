import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

// Health check endpoint that Railway uses to verify your app is running
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
