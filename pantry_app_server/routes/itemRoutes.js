// File: userRoutes.js
// Description: this file contains the routes for item management after being authenticated and submitted under the /item path.
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
    req.user = user;
    next();
  });
}

router.get("/", authenticateToken, async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { userId: req.user.userId },
    });
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, type, quantity, cardId } = req.body;
  const userId = req.user.userId;
  if (!title || !type || !cardId) {
    return res
      .status(400)
      .json({ error: "Title and userId and type are required" });
  }

  try {
    const item = await prisma.item.create({
      data: {
        title,
        quantity: parseInt(quantity) || 1,
        type,
        cardId: parseInt(cardId),
        userId: parseInt(userId),
      },
    });
    res.json(item);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

router.put("/:id/quantity", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { change, type } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { quantity: { increment: change }, type },
    });
    res.json(item);
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ error: "Failed to update item quantity" });
  }
});

router.put("/:id/inCart", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { inCart, cartId } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { inCart: inCart, cartId: parseInt(cartId) },
    });
    res.json(item);
  } catch (error) {
    console.error("Error updating item inCart status:", error);
    res.status(500).json({ error: "Failed to update item inCart status" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.item.delete({
    where: { id: parseInt(id) },
  });
  res.json("item deleted");
});

module.exports = router;
