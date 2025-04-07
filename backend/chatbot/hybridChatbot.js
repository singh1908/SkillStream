const axios = require('axios');

// Simple rule-based fallback
function ruleBasedResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes("hello")) return "Hi there!";
  if (lower.includes("help")) return "How can I help you?";
  if (lower.includes("bye")) return "Goodbye!";
  return null;
}

// Ask LLaMA 2 through Ollama
async function llamaResponse(prompt) {
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama2',
    prompt: prompt,
    stream: false
  });
  return response.data.response.trim();
}

// Combined logic
async function getChatResponse(message) {
  const ruleReply = ruleBasedResponse(message);
  if (ruleReply) return ruleReply;
  return await llamaResponse(message);
}

module.exports = { getChatResponse };
