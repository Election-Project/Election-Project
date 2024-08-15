// controllers/chatController.js

const { Chat } = require("../models");

const getResponse = (message) => {
  // Simple response logic
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("hello")) {
    return "Hi there! How can I help you today?";
  }
  if (lowerMessage.includes("how are you")) {
    return "I am just a bot, but I am doing well! How can I assist you?";
  }
  return "Sorry, I did not understand that. Can you please rephrase?";
};

exports.createChat = async (req, res) => {
  const { message } = req.body;
  const response = getResponse(message);
  try {
    const chat = await Chat.create({
      userMessage: message,
      botResponse: response,
    });
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
