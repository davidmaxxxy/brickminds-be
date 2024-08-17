const express = require("express");
const router = express.Router();
const Joi = require("joi");
const dbConnection = require("../config/dbConnection");



// GET PRODUCT FROM DB BASED ON OPENAI THEME RECOMMENDATION 
router.get("/", (req, res) => {
  try {
    const { priceRange, suggested_Themes } = req.body;
    const userRecommendationSchema = Joi.object({
      suggested_Themes: Joi.array().items(Joi.string()).required(),
      priceRange: Joi.string().required(),
    });
    const { error } = userRecommendationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const priceRanges = priceRange.split("-");
      const query = `SELECT * FROM lego_products  WHERE price BETWEEN ${
        priceRanges[0]
      } AND ${priceRanges[1]}  AND theme IN ('${suggested_Themes.join(
        "', '"
      )}');`;
      dbConnection.query(query, (err, result) => {
        if (err) throw err;
        return res.status(200).json({
          lego_products: result,
        });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
