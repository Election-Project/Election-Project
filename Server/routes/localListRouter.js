const express = require("express");
const router = express.Router();
const { getLocalLists } = require("../controllers/localListController");

router.get("/get", getLocalLists);

module.exports = router;
