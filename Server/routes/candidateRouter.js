const { getAllCandidates } = require("../controllers/candidateController");
const express = require("express");
const router = express.Router();

router.get("/candidate/:id", getAllCandidates);

module.exports = router;
