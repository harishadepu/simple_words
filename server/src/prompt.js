export function buildPrompt(text) {
  return `
You are a precise information extraction system.

Extract structured data from the text.

Return ONLY valid JSON:

{
  "summary": "One concise sentence",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "sentiment": "positive | neutral | negative"
}

Rules:
- Summary must be exactly one sentence
- Exactly 3 key points
- No extra text outside JSON

Text:
${text}
`;
}