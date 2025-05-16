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

// router.get("/",
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      where: { userId: req.user.userId },
    });
    res.json(cards);
  } catch (error) {
    console.error("Error fetching pantires:", error);
    res.status(500).json({ error: "Failed to fetch pantries" });
  }
});
// router.post("/")
router.post("/", authenticateToken, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;
  if (!name || !userId) {
    return res.status(400).json({ error: "Name and userId are required" });
  }

  try {
    const card = await prisma.card.create({
      data: { name, userId: parseInt(userId) },
    });
    res.json(card);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ error: "Failed to add card" });
  }
});

// router.delete("/:id")
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.item.deleteMany({
      where: { cardId: parseInt(id) },
    });
    await prisma.card.delete({
      where: { id: parseInt(id) },
    });
    res.json("Pantry deleted");
  } catch (error) {
    console.error("Error deleting pantry:", error);
    res.status(500).json({ error: "Failed to delete pantry" });
  }
});

module.exports = router;
