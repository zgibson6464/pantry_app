const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

router.post("/", async (req, res) => {
  const { title, quantity } = req.body;
  const item = await prisma.item.create({
    data: { title, quantity },
  });
  res.json(item);
});

router.put("/:id/quantity", async (req, res) => {
  const { id } = req.params;
  const { change } = req.body;
  const item = await prisma.item.update({
    where: { id: parseInt(id) },
    data: { quantity: { increment: change } },
  });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.item.delete({
    where: { id: parseInt(id) },
  });
  res.json("item deleted");
});

module.exports = router;
