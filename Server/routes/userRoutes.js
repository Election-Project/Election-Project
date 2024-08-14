const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserDistrictInfo,
  getAllDistricts,
} = require("../controllers/userController");

router.get("/get/:id", getUser);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);

module.exports = router;
