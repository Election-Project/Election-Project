const {
  getAllCandidates,
  increaseVote,
} = require("../controllers/candidateController");
const express = require("express");
const router = express.Router();

router.get("/candidate/:id", getAllCandidates);
router.post("/vote/:id", increaseVote);

module.exports = router;
