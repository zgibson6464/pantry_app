require("dotenv").config();
const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes"); // Import item routes
const userRoutes = require("./routes/userRoutes"); // Import user routes
const cardRoutes = require("./routes/cardRoutes"); // Import card routes

const app = express();

app.use(express.json());
app.use(cors());

app.use("/items", itemRoutes); // Use item routes
app.use("/user", userRoutes); // Use user routes
app.use("/cards", cardRoutes); // Use card routes

app.listen(3000, () => {
  console.log("app running");
});
