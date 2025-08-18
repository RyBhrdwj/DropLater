const express = require('express');

const app = express();
app.use(express.json());
const SINK_PORT = process.env.SINK_PORT || 4000;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(SINK_PORT, () => {
  console.log(`Sink is running on http://localhost:${SINK_PORT}`)
})