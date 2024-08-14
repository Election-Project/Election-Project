"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LocalList extends Model {
    static associate(models) {
      LocalList.belongsTo(models.ElectoralDistrict, {
        foreignKey: "district_id",
      });
      LocalList.hasMany(models.Candidate, { foreignKey: "list_id" });
    }
  }
  LocalList.init(
    {
      list_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      district_id: DataTypes.INTEGER,
      votes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LocalList",
      tableName: "local_lists",
    }
  );
  return LocalList;
};
