const { getChatResponse } = require('../chatbot/hybridChatbot');

const chatBotHandler = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const reply = await getChatResponse(message);
    res.json({ response: reply });
  } catch (error) {
    console.error('Chatbot Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { chatBotHandler };
