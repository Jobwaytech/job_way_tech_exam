const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role, department } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      uid: Date.now().toString(),
      fullName,
      email,
      password: hashedPassword,
      role: role || "user",
      department,
      permissions: [],
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch =
  user.password.startsWith("$2b$")
    ? await bcrypt.compare(password, user.password)
    : password === user.password;
    console.log("Entered:", password);
    console.log("Stored:", user.password);
    console.log("Match:", isMatch);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "jobwaysecret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        uid: user.uid,
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;