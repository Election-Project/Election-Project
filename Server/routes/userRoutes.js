const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  getUserDistrictInfo,
  getAllDistricts,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/get/:id", getUser);

router.get("/user/district-info", getUserDistrictInfo);
router.get("/election-info", getAllDistricts);

module.exports = router;
