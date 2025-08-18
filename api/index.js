const express = require('express');
const connectDatabase = require('./shared/db')

const app = express();
app.use(express.json());
const API_PORT = process.env.API_PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(API_PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on http://localhost:${API_PORT}`)
})