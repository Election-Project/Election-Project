const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserDistrictInfo,
  getAllDistricts,
  getAllcandidateUsers,
  getCnadidateInfo,
} = require("../controllers/userController");

router.get("/get/:id", getUser);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);
router.get("/candidate/:id", getAllcandidateUsers);
router.get("/candidate-info/:id", getCnadidateInfo);

module.exports = router;
