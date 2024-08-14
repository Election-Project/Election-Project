const db = require("../models");

const getLocalLists = async (req, res) => {
  try {
    const localLists = await db.LocalList.findAll();
    res.json({ localLists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getLocalLists };
