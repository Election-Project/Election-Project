const jwt = require("jsonwebtoken");
const { User, ElectoralDistrict, Candidate, LocalList } = require("../models");
const { Op } = require("sequelize");

const THRESHOLD_PERCENTAGE = 0.05;

getUserDistrictInfo = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token and extract the user's national ID
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const nationalId = decoded.national_id;

    // Find the user by national ID
    const user = await User.findOne({ where: { national_id: nationalId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the electoral district by the user's district ID
    const district = await ElectoralDistrict.findOne({
      where: { district_id: user.district_id },
    });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    // Send the response with user full name and district information
    res.json({
      full_name: user.full_name,
      district_id: district.district_id,
      name: district.name,
      city: district.city,
    });
  } catch (error) {
    console.error("Error retrieving district info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token and extract the user's national ID
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const nationalId = decoded.national_id;

  try {
    const user = await User.findByPk(nationalId);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllcandidateUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { user_type: "candidate", district_id: req.params.id },
    });
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCnadidateInfo = async (req, res) => {
  try {
    const candidate = await User.findOne({
      where: { national_id: req.params.id },
    });
    res.json({ candidate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

getAllDistricts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const nationalId = decoded.national_id;

    const user = await User.findOne({ where: { national_id: nationalId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const districts = await ElectoralDistrict.findAll();

    const districtData = districts.map((district) => ({
      id: district.district_id,
      name: district.name,
      city: district.city,
      number_of_seats: district.number_of_seats,
      female_seat: district.Female_seat,
      circassian_or_chechen_seat: district.Circassian_or_Chechen_seat,
      christian_seat: district.Christian_seat,
      isUserDistrict: district.district_id === user.district_id,
    }));

    res.json(districtData);
  } catch (error) {
    console.error("Error retrieving districts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isVoteLocal = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { national_id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log("user", user);
    user.is_voted_local = true;
    await user.save();

    res.json({
      message: "Local vote boolean updated",
      blankVotes: user.is_voted_local,
    });
  } catch (error) {
    console.error("Error increasing blank vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isVoteParty = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { national_id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log("user", user);
    user.is_voted_party = true;
    await user.save();

    res.json({
      message: "Party vote boolean updated",
      blankVotes: user.is_voted_party,
    });
  } catch (error) {
    console.error("Error increasing blank vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserIDByName = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { full_name: req.params.name },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({
      national_id: user.national_id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

getUserCount = async (req, res) => {
  try {
    const userCount = await User.count();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the user count." });
  }
};

getVotedLocalPercentage = async (req, res) => {
  try {
    const percentage = await User.getVotedLocalPercentage();
    res.json({ percentage });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllWinnersForDistrict = async (req, res) => {
  const { district_id } = req.params;

  try {
    const localLists = await LocalList.findAll({
      where: {
        district_id: district_id,
      },
      include: [
        {
          model: Candidate,
          attributes: ["national_id", "votes", "religion", "gender"],
          required: true,
        },
      ],
    });

    const totalVoters = await User.count({
      where: {
        user_type: "voter",
        district_id: district_id,
      },
    });

    const localThreshold = totalVoters * 0.07;
    console.log(localThreshold);

    const qualifiedLocalLists = localLists.filter((list) => {
      const totalVotesForList = list.Candidates.reduce(
        (sum, candidate) => sum + candidate.votes,
        0
      );
      return totalVotesForList > localThreshold;
    });

    if (qualifiedLocalLists.length === 0) {
      return res
        .status(404)
        .json({ message: "No qualified local lists found" });
    }

    const totalQualifiedVotes = qualifiedLocalLists.reduce((sum, list) => {
      const totalVotesForList = list.Candidates.reduce(
        (sum, candidate) => sum + candidate.votes,
        0
      );
      return sum + totalVotesForList;
    }, 0);

    const district = await ElectoralDistrict.findByPk(district_id);
    const muslimSeats = district ? district.number_of_seats : 0;

    const localResults = qualifiedLocalLists.map((list) => {
      const totalVotesForList = list.Candidates.reduce(
        (sum, candidate) => sum + candidate.votes,
        0
      );
      const seatShare = (totalVotesForList / totalQualifiedVotes) * muslimSeats;
      const seatsWon = Math.round(seatShare);
      return { ...list.toJSON(), seatsWon };
    });

    // Track selected candidates to prevent duplicates
    const selectedCandidates = new Set();

    const electedMuslims = [];
    localResults.forEach((list) => {
      const listCandidates = list.Candidates.filter(
        (c) => c.religion === "Muslim"
      ).sort((a, b) => b.votes - a.votes);
      listCandidates.forEach((candidate) => {
        if (
          electedMuslims.length < list.seatsWon &&
          !selectedCandidates.has(candidate.national_id)
        ) {
          electedMuslims.push(candidate);
          selectedCandidates.add(candidate.national_id);
        }
      });
    });

    const categories = ["Christian", "Circassian", "Chechen"];
    const electedOthers = categories.map((category) => {
      const candidates = qualifiedLocalLists
        .flatMap((list) => list.Candidates)
        .filter((c) => c.religion === category)
        .sort((a, b) => b.votes - a.votes);
      const topCandidate = candidates.find(
        (candidate) => !selectedCandidates.has(candidate.national_id)
      );
      if (topCandidate) {
        selectedCandidates.add(topCandidate.national_id);
      }
      return topCandidate || null;
    });

    const electedWomen = qualifiedLocalLists
      .flatMap((list) => list.Candidates)
      .filter((c) => c.gender === "Female")
      .sort((a, b) => b.votes - a.votes)
      .filter((candidate) => !selectedCandidates.has(candidate.national_id))
      .slice(0, 1);

    const allElectedCandidates = [
      ...electedMuslims,
      ...electedOthers.filter((candidate) => candidate !== null),
      ...electedWomen,
    ];

    res.json({ electedCandidates: allElectedCandidates });
  } catch (error) {
    console.error("Error calculating elected candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsersByDistrictId = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { district_id: req.params.id, user_type: "voter" },
    });
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changeFromVoterToCandidate = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.user_type = "candidate";
    await user.save();
    res.json({ message: "User type updated to candidate" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  getAllDistricts,
  getUserDistrictInfo,
  getAllcandidateUsers,
  getCnadidateInfo,
  isVoteLocal,
  getUserIDByName,
  isVoteParty,
  getUserCount,
  getVotedLocalPercentage,
  getUserByToken,
  getAllUsersByDistrictId,
  changeFromVoterToCandidate,
  getAllWinnersForDistrict,
};
