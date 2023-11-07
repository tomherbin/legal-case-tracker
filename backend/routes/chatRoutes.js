// chatRoutes.js

const express = require("express");
const { OpenAI } = require("openai");
const router = express.Router();

require("dotenv").config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.post("/send", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "gpt-3.5-turbo-0613", // adjust the model if needed
      max_tokens: 150,
      temperature: 0.7,
    });

    const botMessage = response.choices[0].message.content.trim();
    res.json({ reply: botMessage });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).send("Error communicating with the chatbot");
  }
});

module.exports = router;


