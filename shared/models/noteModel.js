const mongoose = require("mongoose");
const attemptSchema = require("./attemptSchema");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  releaseAt: { type: Date },
  webhookUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "failed", "delivered", "dead"],
    default: "pending",
    required: true,
  },
  attempts: [attemptSchema],
  deliveredAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Note", noteSchema);
