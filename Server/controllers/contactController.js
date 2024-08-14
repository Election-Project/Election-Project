const db = require('../models');
const ContactUsMessage = db.ContactUsMessage;

const saveContactMessage = async (req, res) => {
  console.log('DB object:', db);
  console.log('ContactUsMessage model:', ContactUsMessage);

  try {
    if (!ContactUsMessage) {
      throw new Error('ContactUsMessage model is not defined');
    }

    const { national_id, message } = req.body;

    const newMessage = await ContactUsMessage.create({
      national_id,
      message,
    });

    res.status(201).json({ message: "Contact message saved successfully.", data: newMessage });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: error.message || "An error occurred while saving the contact message." });
  }
};

module.exports = {
  saveContactMessage,
};