const express = require("express");
const router = express.Router();
const generateLegoThemeByOpenAi = require("../api_Assis/api_assistant");
const dbConnection = require("../config/dbConnection");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { age, priceRange, likes, experienceLevel, giftAim } = req.body;

    // Validate body
    const userRecommendationSchema = Joi.object({
      age: Joi.number().required(),
      likes: Joi.string().required(),
      experienceLevel: Joi.string().required(),
      giftAim: Joi.string().required(),
      priceRange: Joi.string().required(),
    });

    const { error } = userRecommendationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      // Get all themes from DB
      dbConnection.query("SELECT * FROM themes", async (err, result) => {
        if (err) throw err;

        const availableThemesNamesInDb = result.map((each) => {
          const { name: themeName } = each;
          return themeName;
        });

        // Get recommendation from OpenAI
        const suggestedThemes = await generateLegoThemeByOpenAi(
          availableThemesNamesInDb,
          age,
          likes,
          experienceLevel,
          giftAim
        );

        // Respond with a redirect to get products
        return res.status(301).json({
          priceRange,
          suggested_Themes: suggestedThemes,
        });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
