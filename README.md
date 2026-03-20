
## 🚀 Project Overview

This project demonstrates how to:

* Accept messy/unstructured text input
* Send it to an LLM (via backend)
* Return a structured JSON response:

  * ✅ One-sentence summary
  * ✅ Three key points
  * ✅ Sentiment (positive / neutral / negative)

The goal is **clarity over complexity** — a small, working solution you can confidently explain.

---

## 🧰 Tech Stack

**Frontend**

* React (Vite)
* Fetch API

**Backend**

* Node.js
* Express
* dotenv
* cors

**LLM**

* OpenAI-compatible SDK

---

## 📁 Project Structure

```
assignment-summarizer/
  client/
    src/
      App.jsx
      main.jsx
      components/
        ResultCard.jsx
    index.html
    package.json

  server/
    src/
      index.js
      llm.js
      prompt.js
      validate.js
    .env.example
    package.json

  README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd assignment-summarizer
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create `.env` file:

```
OPENAI_API_KEY=your_api_key_here
PORT=5000
```

Run backend:

```
npm run dev
```

---

### 3. Setup Frontend

```
cd ../client
npm install
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔄 How It Works

1. User pastes text into textarea
2. Frontend sends POST request to backend:

   ```
   /api/summarize
   ```
3. Backend:

   * Validates input
   * Sends prompt to LLM
   * Parses structured JSON
4. Response returned to frontend
5. UI displays:

   * Summary
   * Key Points
   * Sentiment

---

## 🧠 Prompt Design

```
You are an assistant that converts unstructured text into a strict JSON summary.

Return only valid JSON with this shape:
{
  "summary": "one sentence",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive | neutral | negative"
}

Rules:
- summary must be exactly one sentence
- keyPoints must contain exactly 3 short bullet-style strings
- sentiment must be one of the allowed labels only
- do not include markdown
- do not include extra keys

Text to analyze:
{{USER_TEXT}}
```

### ✅ Why this works

* Enforces strict structure
* Prevents extra text/markdown
* Reduces parsing errors

---

## 🔌 Backend API Example

```js
app.post('/api/summarize', async (req, res) => {
  const text = req.body?.text?.trim();

  if (!text) {
    return res.status(400).json({ error: 'Input text is required.' });
  }

  try {
    const result = await summarizeText(text);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to summarize text.' });
  }
});
```

---

## 💻 Frontend Flow

* Textarea for input
* Submit button
* voice input
* Loading state: `"Analyzing..."`
* Result cards:

  * Summary
  * Key Points
  * Sentiment
* Error handling

---

## ⚠️ Error Handling

Handled cases:

* Empty input
* Missing API key
* API failure
* Invalid JSON from model
* Network errors

---


## 📊 Example Output

**Input:**

```
Artificial intelligence is transforming industries by automating tasks, improving efficiency, and enabling better decision-making. However, it also raises concerns about job displacement and ethical considerations.
```

**Output:**

```json
{
  "summary": "Artificial intelligence is transforming industries while raising ethical and employment concerns.",
  "keyPoints": [
    "AI automates repetitive tasks",
    "Improves efficiency and decision-making",
    "Raises job displacement concerns"
  ],
  "sentiment": "neutral"
}
```



## 💡 Final Advice

Keep it simple, working, and explainable.

A clean small project with a strong README will outperform a complex unfinished one.

---
