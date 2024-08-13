"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LocalList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LocalList.belongsTo(models.ElectoralDistrict, {
        foreignKey: "district_id",
      });
      LocalList.hasMany(models.Candidate, { foreignKey: "list_id" });
      LocalList.hasMany(models.Vote, { foreignKey: "local_list_id" });
    }
  }
  LocalList.init(
    {
      name: DataTypes.STRING,
      votes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LocalList",
    }
  );
  return LocalList;
};
