const express = require("express");
const AdvertisementController = require("../controllers/AdvertisementController");

const router = express.Router();

// Route to get all advertisements
router.get("/advertisements", AdvertisementController.getAllAdvertisements);

// Route to get a specific advertisement by ID
router.get(
  "/advertisements/:ad_id",
  AdvertisementController.getAdvertisementById
);

module.exports = router;
