import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {buildPrompt} from './src/prompt.js'
import { main } from "./src/llm.js";
import { validateInput } from "./src/validate.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('server running')
})

app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;

  // ✅ Validate input
  const error = validateInput(text);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const prompt = buildPrompt(text);

    const raw = await main(prompt);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(500).json({
        error: "Failed to parse LLM response",
      });
    }

    res.json(parsed);

  } catch (err) {
    console.error("LLM ERROR:", err);
    res.status(500).json({
      error: err.message || "LLM request failed",
    });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});