const express = require("express");
const app = express();
const connectToDatabase = require("./config/dbConnection");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`server running ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "working" });
});
