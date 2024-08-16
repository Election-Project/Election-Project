const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/user/district-info", UserController.getUserDistrictInfo);
router.get("/election-info", UserController.getAllDistricts);
router.get("/user-count", UserController.getUserCount);
router.get("/voted-local-percentage", UserController.getVotedLocalPercentage);

module.exports = router;
