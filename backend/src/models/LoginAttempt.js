const mongoose = require("mongoose");

const loginAttemptSchema = new mongoose.Schema(
  {
    email: String,
    ip: String,
    success: Boolean,
    reason: String,
    userAgent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginAttempt", loginAttemptSchema);
