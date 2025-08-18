const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  at: { type: Date, default: Date.now },
  statusCode: { type: Number },
  ok: { type: Boolean },
  error: { type: String },
});

module.exports = attemptSchema;
