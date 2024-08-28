const db = require("../models");
const getPartyList = async (req, res) => {
  try {
    const partyLists = await db.PartyList.findAll({
      where: { is_approved: true },
    });
    res.json({ partyLists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPartyListNotApproved = async (req, res) => {
  try {
    const partyLists = await db.PartyList.findAll({
      // where: { is_approved: false },
      include: [
        {
          model: db.PartyListCandidate,
          as: "PartyListCandidates", // Ensure this matches the alias defined in your association
          include: [
            {
              model: db.User, // Include the User model
              as: "User", // This alias should match the alias used in the PartyListCandidate model association
              attributes: ["full_name"], // Retrieve only the full_name attribute
            },
          ],
        },
      ],
    });
    res.json({ partyLists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const increaseVoteCounter = async (req, res) => {
  try {
    const partyList = await db.PartyList.findOne({
      where: { name: req.params.name },
    });

    if (!partyList) {
      return res.status(404).json({ message: "partyList not found" });
    }
    console.log("partyList", partyList);
    partyList.votes += 1;
    await partyList.save();

    res.json({
      message: "votes increased",
      blankVotes: partyList.votes,
    });
  } catch (error) {
    console.error("Error increasing votes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createPartyList = async (req, res) => {
  try {
    const newPartyList = await db.PartyList.create(req.body);
    res.json(newPartyList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const partyListApprove = async (req, res) => {
  try {
    const partyList = await db.PartyList.findOne({
      where: { list_id: req.params.id },
    });

    if (!partyList) {
      return res.status(404).json({ message: "partyList not found" });
    }
    partyList.is_approved = true;
    await partyList.save();

    res.json({
      message: "partyList approved",
    });
  } catch (error) {
    console.error("Error approving partyList:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPartyList,
  increaseVoteCounter,
  createPartyList,
  getPartyListNotApproved,
  partyListApprove,
};
