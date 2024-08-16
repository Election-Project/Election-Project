const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserDistrictInfo,
  getAllDistricts,
  getAllcandidateUsers,
  getCnadidateInfo,
  isVoteLocal,
  getUserIDByName,
  isVoteParty,
  getUserDistrictInfo,
  getAllDistricts,
  getUserCount,
  getVotedLocalPercentage,
} = require("../controllers/userController");

router.get("/get/:id", getUser);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);
router.get("/candidate/:id", getAllcandidateUsers);
router.get("/candidate-info/:id", getCnadidateInfo);
router.post("/is-vote-local/:id", isVoteLocal);
router.get("/user-id/:name", getUserIDByName);
router.post("/is-vote-party/:id", isVoteParty);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);
router.get("/user-count", getUserCount);
router.get("/voted-local-percentage", getVotedLocalPercentage);

module.exports = router;
