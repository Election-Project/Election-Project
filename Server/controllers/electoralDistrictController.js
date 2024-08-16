// controllers/electoralDistrictController.js
const { ElectoralDistrict } = require("../models");

exports.getElectoralDistrictCount = async (req, res) => {
  try {
    const count = await ElectoralDistrict.count();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching district count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
