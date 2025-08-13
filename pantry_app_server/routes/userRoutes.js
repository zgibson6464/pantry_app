// File: userRoutes.js
// Description: This file contains the routes for user registration and login after being authenticated and submitted under the /user path.
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
import UserObject from "./authenticateObject.js";
import errorMessages from "./errorMessages.js"; // Import error codes for consistent error handling

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
    return errorMessages.INVALID_INPUT(userData.error, res);
  }

  const { username, email, password } = userData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorMessages.USER_ALREADY_EXISTS(username, res);
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
    res.status(500).json({ error: "User registration failed" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return errorMessages.USER_NOT_FOUND(email, res);
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorMessages.INVALID_CREDENTIALS(res);
    }

    //Generate a Json Web Token (JWT)
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    res.json({ message: "login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return errorMessages.USER_LOGIN_FAILED(res);
  }
});

module.exports = router;
