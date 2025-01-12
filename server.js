const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//import routes
const generateRecommendationThemesFromParentInput = require("./routes/generateRecommendationThemes.js");
const getProducts = require("./routes/getProducts.js");

app.listen(PORT, (req, res) => {
  console.log(`server running ${PORT}`);
});
app.get("/api/v1/", (req, res) => {
  res.json({ message: "working" });
});

// API END POINTS
app.use(
  "/api/v1/generate-recommendation-themes",
  generateRecommendationThemesFromParentInput
);
app.use("/api/v1/products", getProducts);
