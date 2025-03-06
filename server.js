const express = require("express");
const { prismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/item", async (req, res) => {
  const { title } = req.body;
  const item = await prisma.item.create({
    data: { title },
  });
  res.json(item);
});

app.put("/item/:id", async (req, res) => {
  const { id } = req.params;
  const { title, quantity } = req.body;
  const item = await prisma.item.update({
    where: { id: parseInt(id) },
    data: { title, quantity },
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
