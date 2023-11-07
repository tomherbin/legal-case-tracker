const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateSummary(description) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Summarize this for a legal case brief in one short sentence under 50 characters:\n\n${description}`,
        },
      ],
      model: "gpt-3.5-turbo-0613",

      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating summary with OpenAI:", error);
    throw error;
  }
}

module.exports = {
  generateSummary,
};
