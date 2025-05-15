import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

// Make sure the root route is properly defined for Railway health checks
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// Use the PORT provided by Railway
const PORT = process.env.PORT || 8080;

// Start the server and log the actual port
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
