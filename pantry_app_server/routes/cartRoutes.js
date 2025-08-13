const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
import authenticateToken from "./authenticateToken.js"; // Import the authenticateToken function
import errorMessages from "./errorMessages.js"; // Import error codes for consistent error handling

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      where: { userId: req.user.userId },
    });
    res.json(cart);
  } catch (error) {
    errorMessages.FAILED_TO_FETCH("cart", res);
  }
});

module.exports = router;
