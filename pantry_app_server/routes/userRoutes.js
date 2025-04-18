const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (existingUser) {
    console.error("User already exists:", existingUser);
    return res.status(400).json({ error: "User already exists" });
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      //Generate a Json Web Token (JWT)
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
      res.json({ message: "Registration successful", token });
    } catch (error) {
      res.status(400).json({ error: "User registration failed" });
      console;
    }
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //Generate a Json Web Token (JWT)
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    res.json({ message: "login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login Failed" });
  }
});

module.exports = router;
