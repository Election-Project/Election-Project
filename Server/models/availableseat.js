"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AvailableSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AvailableSeat.belongsTo(models.ElectoralDistrict, {
        foreignKey: "district_id",
      });
    }
  }
  AvailableSeat.init(
    {
      seat_type: DataTypes.ENUM(
        "Muslim",
        "Christian",
        "Circassian",
        "Chechen",
        "Female"
      ),
      number_of_seats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AvailableSeat",
    }
  );
  return AvailableSeat;
};
