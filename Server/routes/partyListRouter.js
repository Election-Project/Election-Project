const {
  getPartyList,
  increaseVoteCounter,
} = require("../controllers/partyListController");
const express = require("express");
const partyListRouter = express.Router();
partyListRouter.get("/get", getPartyList);
partyListRouter.put("/increase/:name", increaseVoteCounter);

module.exports = partyListRouter;
