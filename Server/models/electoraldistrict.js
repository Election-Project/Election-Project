"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ElectoralDistrict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ElectoralDistrict.hasMany(models.User, { foreignKey: "district_id" });
      ElectoralDistrict.hasMany(models.LocalList, {
        foreignKey: "district_id",
      });
    }
  }
  ElectoralDistrict.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ElectoralDistrict",
    }
  );
  return ElectoralDistrict;
};
