// File: userRoutes.js
// Description: this file contains the routes for item management after being authenticated and submitted under the /item path.
const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
import authenticateToken from "./authenticateToken.js"; // Import the authenticateToken function
import errorMessages from "./errorMessages.js";
import ItemObject from "./authenticateObject.js";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { userId: req.user.userId },
    });
    res.json(items);
  } catch (error) {
    return errorMessages.FAILED_TO_FETCH("items", res);
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
    return errorMessages.INVALID_INPUT(itemData.error, res);
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
    return errorMessages.FAILED_TO_ADD("item already exists", res);
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
    return errorMessages.FAILED_TO_ADD("item", res);
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
    return errorMessages.FAILED_TO_UPDATE("Quantity", res);
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
    return errorMessages.FAILED_TO_UPDATE("Purchase Quantity", res);
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
    return errorMessages.FAILED_TO_UPDATE("In cart status", res);
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
    return errorMessages.FAILED_TO_UPDATE("Item in Pantry", res);
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
    return errorMessages.FAILED_TO_DELETE("Item", res);
  }
});

module.exports = router;
