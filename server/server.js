import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load from environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Route: Enhance text
app.post("/api/enhance-text", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant that improves user prompts for clarity, tone, and creativity." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const enhancedText = data.choices[0].message.content;
    res.json({ enhancedText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Generate image
app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "512x512"
      })
    });

    const data = await response.json();
    res.json({ imageUrl: data.data[0].url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));