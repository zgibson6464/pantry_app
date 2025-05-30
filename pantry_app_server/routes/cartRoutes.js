const express = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();
const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("user", user);
    req.user = user;
    next();
  });
}

router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      where: { userId: req.user.userId },
    });
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
});

module.exports = router;
