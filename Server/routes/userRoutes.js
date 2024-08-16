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
} = require("../controllers/userController");

router.get("/get/:id", getUser);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);
router.get("/candidate/:id", getAllcandidateUsers);
router.get("/candidate-info/:id", getCnadidateInfo);
router.post("/is-vote-local/:id", isVoteLocal);
router.get("/user-id/:name", getUserIDByName);
router.post("/is-vote-party/:id", isVoteParty);

module.exports = router;
