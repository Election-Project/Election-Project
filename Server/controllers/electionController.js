const { ElectoralDistrict, ElectionSetting } = require("../models");

const increaseBlankVote = async (req, res) => {
  try {
    const district = await ElectoralDistrict.findOne({
      where: { district_id: req.params.id },
    });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }
    console.log("district", district);
    district.blankVotes += 1;
    await district.save();

    res.json({
      message: "Blank vote increased",
      blankVotes: district.blankVotes,
    });
  } catch (error) {
    console.error("Error increasing blank vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const increasePartyBlankVote = async (req, res) => {
  try {
    const district = await ElectionSetting.findAll();

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }
    console.log("district", district[0]);
    district[0].party_blank_vote += 1;
    await district[0].save();

    res.json({
      message: "Blank vote increased",
      blankVotes: district[0].party_blank_vote,
    });
  } catch (error) {
    console.error("Error increasing blank vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { increaseBlankVote, increasePartyBlankVote };
