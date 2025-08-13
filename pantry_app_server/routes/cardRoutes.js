const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
import authenticateToken from "./authenticateToken.js"; // Import the authenticateToken function
import errorMessages from "./errorMessages.js"; // Import error codes for consistent error handling
import CardObject from "./authenticateObject.js"; // Import the CardObject schema for validation

const prisma = new PrismaClient();
const router = express.Router();

// router.get("/",
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      where: { userId: req.user.userId },
    });
    res.json(cards);
  } catch (error) {
    errorMessages.FAILED_TO_FETCH("cards", res);
  }
});
// router.post("/")
router.post("/", authenticateToken, async (req, res) => {
  const cardData = CardObject.parse({
    name: req.body.name,
    userId: req.user.userId,
  });
  try {
    const card = await prisma.card.create({
      data: { name: cardData.name, userId: cardData.userId },
    });
    res.json(card);
  } catch (error) {
    return errorMessages.FAILED_TO_ADD("card", res);
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
    return errorMessages.FAILED_TO_DELETE("card", res);
  }
});

module.exports = router;
