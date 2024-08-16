const { Advertisement } = require("../models");

class AdvertisementController {
  // Retrieve all advertisements
  static async getAllAdvertisements(req, res) {
    try {
      const advertisements = await Advertisement.findAll();
      return res.status(200).json(advertisements);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Retrieve a single advertisement by ID
  static async getAdvertisementById(req, res) {
    try {
      const { ad_id } = req.params;
      const advertisement = await Advertisement.findByPk(ad_id);

      if (!advertisement) {
        return res.status(404).json({ error: "Advertisement not found" });
      }

      return res.status(200).json(advertisement);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AdvertisementController;
