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
      content: `Please provide an array of 3 LEGO themes based on the user's preferences Age: ${age} ,Likes: ${likes} ,Building Experience Level: ${experienceLevel} ,Gift Aim: ${giftAim} 
       and  Available themes we have in our DataBase : ${availableThemesNamesInDb} .  The output should be in the format: ["Theme1", "Theme2", "Theme3"] proper JSON array and no explanation `,
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


console.log('get called',{age,
  likes,
  experienceLevel,
  giftAim});
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
