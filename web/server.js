const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

const visitSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Visit = mongoose.model("Visit", visitSchema);

app.get("/", async (_req, res) => {
  try {
    const previousVisits = await Visit.countDocuments();

    await Visit.create({
      message: "Application accessed successfully"
    });

    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Docker Compose Multi-Service App</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 720px; margin: 60px auto; padding: 0 20px; color: #172033; background: #f4f7fb; }
    main { background: white; padding: 32px; border-radius: 14px; box-shadow: 0 8px 30px #15233a12; }
    h1 { margin-top: 0; } .ok { color: #16834a; font-weight: bold; }
    code { background: #eef2f7; padding: 3px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <main>
    <h1>Multi-Service Application</h1>
    <h2>Node.js + MongoDB + Docker Compose</h2>
    <p>Node.js Web Service: <span class="ok">Running</span></p>
    <p>MongoDB Database: <span class="ok">Connected</span></p>
    <p>Total previous visits: <strong>${previousVisits}</strong></p>
    <p>Each page refresh is saved as a document in MongoDB.</p>
  </main>
</body>
</html>`);
  } catch (error) {
    console.error("Failed to handle request:", error.message);
    res.status(500).send("Database operation failed.");
  }
});

app.get("/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "database_disconnected",
    database: connected ? "connected" : "disconnected"
  });
});

async function startServer() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is required");
  }

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB Connected");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Application startup failed:", error);
  process.exit(1);
});
