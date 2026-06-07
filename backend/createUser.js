const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.connect("mongodb+srv://jobwaytech_db_user:cmgMI89gsU1UgbLT@cluster0.hdgozie.mongodb.net/?appName=Cluster0");

async function run() {
  const User = mongoose.model(
    "User",
    new mongoose.Schema({}, { strict: false })
  );

  const password = await bcrypt.hash("hr@jobwaytech.com", 10);

  await User.create({
    uid: "1001",
    fullName: "HR Admin",
    email: "hr@jobwaytech.com",
    password,
    role: "hr",
    department: "HR",
    permissions: []
  });

  console.log("User created");
  process.exit();
}

run();