// File: userRoutes.js
// Description: This file contains the routes for user registration and login after being authenticated and submitted under the /user path.
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserObject } = require("./authenticateObject.js");
const errorMessages = require("./errorMessages.js"); // Import error codes for consistent error handling
const prisma = new PrismaClient();
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const userData = UserObject.safeParse({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  if (!userData.success) {
    return res.status(400).json({
      error: errorMessages.INVALID_INPUT(userData.error),
    });
  }

  const { username, email, password } = userData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: errorMessages.USER_ALREADY_EXISTS(email),
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        carts: {
          create: {
            name: "Shopping Cart",
            items: {
              create: [],
            },
          },
        },
      },
    });

    // Generate a Json Web Token (JWT)
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    res.json({ message: "Registration successful", token });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: errorMessages.USER_REGISTRATION_FAILED() });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ error: errorMessages.USER_NOT_FOUND(email) });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: errorMessages.INVALID_CREDENTIALS() });
    }

    //Generate a Json Web Token (JWT)
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    res.json({ message: "login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: errorMessages.LOGIN_FAILED() });
  }
});

module.exports = router;
