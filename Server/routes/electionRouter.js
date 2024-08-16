const {
  increaseBlankVote,
  increasePartyBlankVote,
} = require("../controllers/electionController");
const express = require("express");
const electionRouter = express.Router();

electionRouter.post("/district/:id/", increaseBlankVote);
electionRouter.post("/party/", increasePartyBlankVote);

module.exports = electionRouter;
