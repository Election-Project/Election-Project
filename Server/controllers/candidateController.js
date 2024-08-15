const { Candidate } = require("../models");

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findOne({
      where: { national_id: req.params.id },
    });
    res.json({ candidates });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllCandidates };
