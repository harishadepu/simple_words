export function validateInput(text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    return "Input must be a non-empty string";
  }
  return null;
}