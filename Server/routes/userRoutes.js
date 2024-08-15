const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserDistrictInfo,
  getAllDistricts,
  getAllcandidateUsers,
} = require("../controllers/userController");

router.get("/get/:id", getUser);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);
router.get("/candidate/:id", getAllcandidateUsers);

module.exports = router;
