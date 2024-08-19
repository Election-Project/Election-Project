const { ElectoralDistrict } = require("../models");

const getDistrictByName = async (req, res) => {
  try {
    const { name } = req.query;
    const districts = await ElectoralDistrict.findAll({
      where: name ? { name } : {}, // Filter by name if provided
    });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve districts" });
  }
};

const allDistricts = async (req, res) => {
  try {
    const districts = await ElectoralDistrict.findAll();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve districts" });
  }
};

module.exports = {
  getDistrictByName,
  allDistricts,
};
