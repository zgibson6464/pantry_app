// File: userRoutes.js
// Description: this file contains the routes for item management after being authenticated and submitted under the /item path.
const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const authenticateToken = require("./authenticateToken.js");
const errorMessages = require("./errorMessages.js");
const { ItemObject } = require("./authenticateObject.js");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { userId: req.user.userId },
    });
    res.json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ error: errorMessages.FAILED_TO_FETCH("items") });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const itemData = ItemObject.safeParse({
    title: req.body.title,
    type: req.body.type,
    quantity: req.body.quantity,
    cardId: req.body.cardId,
    inCart: req.body.inCart,
    cartId: req.body.cartId,
    purchaseQuantity: req.body.purchaseQuantity,
    userId: req.user.userId,
  });
  if (!itemData.success) {
    return res
      .status(400)
      .json({ error: errorMessages.INVALID_INPUT("item data") });
  }
  const {
    title,
    type,
    quantity,
    cardId,
    inCart,
    cartId,
    purchaseQuantity,
    userId,
  } = itemData.data;
  const existingItem = await prisma.item.findFirst({
    where: {
      userId: parseInt(userId),
      title: title,
    },
  });
  if (existingItem) {
    return res
      .status(400)
      .json({ error: errorMessages.ITEM_ALREADY_EXISTS(title) });
  }

  try {
    const item = await prisma.item.create({
      data: {
        title,
        quantity: parseInt(quantity),
        type,
        cardId: parseInt(cardId),
        inCart: inCart || false,
        cartId: cartId ? parseInt(cartId) : null,
        purchaseQuantity: purchaseQuantity || 0,
        userId: parseInt(userId),
      },
    });
    res.json(item);
  } catch (error) {
    return res.status(500).json({ error: errorMessages.FAILED_TO_ADD("item") });
  }
});

router.put("/:id/quantity", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { change } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { quantity: { increment: change } },
    });
    res.json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ error: errorMessages.FAILED_TO_UPDATE("Quantity") });
  }
});

router.put("/:id/purchaseQuantity", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { purchaseQuantity } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { purchaseQuantity: { increment: purchaseQuantity } },
    });
    res.json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ error: errorMessages.FAILED_TO_UPDATE("Purchase Quantity") });
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
    return res
      .status(500)
      .json({ error: errorMessages.FAILED_TO_UPDATE("In cart status") });
  }
});

router.put("/:id/card", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { cardId } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { cardId: parseInt(cardId) },
    });
    res.json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ error: errorMessages.FAILED_TO_UPDATE("Item in Pantry") });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({
      where: { id: parseInt(id) },
    });
    res.json("item deleted");
  } catch (error) {
    return res
      .status(500)
      .json({ error: errorMessages.FAILED_TO_DELETE("Item") });
  }
});

module.exports = router;
