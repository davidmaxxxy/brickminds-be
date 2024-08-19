const express = require("express");
const router = express.Router();
const Joi = require("joi");
const dbConnection = require("../config/dbConnection");



// GET PRODUCT FROM DB BASED ON OPENAI THEME RECOMMENDATION 
router.get("/", (req, res) => {
  try {
    // const { priceRange, suggested_Themes } = req.body;
    const priceRange = `${req.query.priceRange}`; 
    const suggested_Themes = req.query.suggested_Themes;  
    
   
      const priceRanges = priceRange.split("-");
      console.log('priceRange',priceRanges);
      const query = `SELECT * FROM lego_products  WHERE price BETWEEN ${
        priceRanges[0]
      } AND ${priceRanges[1]}  AND theme IN ('${suggested_Themes.join(
        "', '"
      )}');`;
      dbConnection.query(query, (err, result) => {
        if (err) throw err;
        console.log('result',result);
        return res.status(200).json({
          lego_products: result,
        });
      });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
