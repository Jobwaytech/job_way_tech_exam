const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: String,
    fullName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    department: String,
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

