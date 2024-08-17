const express = require("express");
const router = express.Router();
const generateLegoThemeByOpenAi = require("../api_Assis/api_assistant");
const Joi = require("joi");

// Get all hotels
router.post("/", async (req, res) => {
  try {
    const { age, priceRange, likes, experienceLevel, giftAim } = req.body;
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
      const suggestedThemes = await generateLegoThemeByOpenAi(
        age,
        likes,
        experienceLevel,
        giftAim
      );
      return res.status(301).json({
        age,
        priceRange,
        likes,
        experienceLevel,
        giftAim,
        suggested_Themes: suggestedThemes,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
