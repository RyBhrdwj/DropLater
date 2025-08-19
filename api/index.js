const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const connectDatabase = require("./shared/db");
const { fetchNotes, postNote, replayNote } = require("./notesController");

const app = express();
const ratelimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors());
app.use(ratelimiter);

const API_PORT = process.env.API_PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/notes", (req, res) => fetchNotes(req, res));

app.post("/api/notes", (req, res) => postNote(req, res));

app.post("/api/notes/:id/replay", (req, res) => replayNote(req, res));

app.listen(API_PORT, async () => {
  await connectDatabase();
  console.log(`Server at http://localhost:${API_PORT}`);
});
