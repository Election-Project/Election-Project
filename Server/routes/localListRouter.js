const express = require("express");
const router = express.Router();
const {
  getLocalLists,
  increaseVoteCounter,
} = require("../controllers/localListController");

router.get("/get", getLocalLists);
router.post("/increase-vote/:name", increaseVoteCounter);

module.exports = router;
