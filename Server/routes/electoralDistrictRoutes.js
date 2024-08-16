// routes/electoralDistrictRoutes.js
const express = require("express");
const router = express.Router();
const electoralDistrictController = require("../controllers/electoralDistrictController");

router.get(
  "/districts/count",
  electoralDistrictController.getElectoralDistrictCount
);

module.exports = router;
