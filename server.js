const express = require("express");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.json("hello world");
});

app.post("/item", (req, res) => {
  const { name } = req.body;
  res.json(title);
});

app.put("/item/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.json(`${id} ${title}`);
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  res.json(id);
});

app.listen(3000, () => {
  console.log("app running");
});
