const axios = require("axios");
require("dotenv").config();

// Function to generate a LEGO theme
async function generateLegoTheme(
  availableThemesNamesInDb,
  age,
  likes,
  experienceLevel,
  giftAim
) {
  const message = [
    {
      role: "system",
      content:
        "You are a creative assistant that helps recommend LEGO products.",
    },
    {
      role: "user",
      content: `Based on the following preferences:
        - Age: ${age}
        - Likes: ${likes}
        - Building Experience Level: ${experienceLevel}
        - Gift Aim: ${giftAim}
        - Available themes we have in our DataBase : ${availableThemesNamesInDb}

        Suggest the top 3 themes that would be most appealing and be in the Available themes we have in our DataBase only and it should be only the themes and no explanation  `,
    },
  ];
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: message,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const suggestedThemes = response.data.choices[0].message.content.trim();
    return suggestedThemes.split("\n").map((theme) => theme.trim());
  } catch (error) {
    console.error(
      "Error generating LEGO theme:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = generateLegoTheme;
