const jwt = require("jsonwebtoken");
const { User, ElectoralDistrict } = require("../models");

exports.getUserDistrictInfo = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token and extract the user's national ID
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const nationalId = decoded.national_id;

    // Find the user by national ID
    const user = await User.findOne({ where: { national_id: nationalId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the electoral district by the user's district ID
    const district = await ElectoralDistrict.findOne({
      where: { district_id: user.district_id },
    });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    // Send the response with user full name and district information
    res.json({
      full_name: user.full_name,
      district_id: district.district_id,
      name: district.name,
      city: district.city,
    });
  } catch (error) {
    console.error("Error retrieving district info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllDistricts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const nationalId = decoded.national_id;

    const user = await User.findOne({ where: { national_id: nationalId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const districts = await ElectoralDistrict.findAll();

    const districtData = districts.map((district) => ({
      id: district.district_id,
      name: district.name,
      city: district.city,
      number_of_seats: district.number_of_seats,
      female_seat: district.Female_seat,
      circassian_or_chechen_seat: district.Circassian_or_Chechen_seat,
      christian_seat: district.Christian_seat,
      isUserDistrict: district.district_id === user.district_id,
    }));

    res.json(districtData);
  } catch (error) {
    console.error("Error retrieving districts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const userCount = await User.count();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the user count." });
  }
};

exports.getVotedLocalPercentage = async (req, res) => {
  try {
    const percentage = await User.getVotedLocalPercentage();
    res.json({ percentage });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
