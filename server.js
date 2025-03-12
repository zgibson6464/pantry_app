const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/item", async (req, res) => {
  const { title, quantity } = req.body;
  console.log("Received item:", title, quantity); // Debug log
  const item = await prisma.item.create({
    data: { title, quantity },
  });
  res.json(item);
});

app.put("/item/:id/quantity", async (req, res) => {
  const { id } = req.params;
  const { change } = req.body;
  const item = await prisma.item.update({
    where: { id: parseInt(id) },
    data: { quantity: { increment: change } },
  });
  res.json(item);
});

app.delete("/item/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.item.delete({
    where: { id: parseInt(id) },
  });
  res.json("item deleted");
});

app.listen(3000, () => {
  console.log("app running");
});
