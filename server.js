const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const connectToDatabase = require("./config/dbConnection");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//import routes
const generateRecommendationThemesFromParentInput = require("./routes/generateRecommendationThemes.js");

app.listen(PORT, (req, res) => {
  console.log(`server running ${PORT}`);
});
app.get("/api/v1/", (req, res) => {
  res.json({ message: "working" });
});

// parent make selection then past the to end point , we use the to generate recommendation of 9 THEMES  for kid by using OPEN AI
//  and the save that to DB a get display 3 THEMES  each to kids 
// then they select one each   then we get final 3 and get product from db for child 



// API END POINTS
app.use("/api/v1/generate-recommendation-themes", generateRecommendationThemesFromParentInput);
