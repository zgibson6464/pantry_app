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

app.listen(3000, () => {
  console.log("app running");
});
