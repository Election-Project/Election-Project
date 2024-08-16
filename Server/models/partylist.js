"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PartyList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PartyList.hasMany(models.PartyListCandidate, {
        foreignKey: "party_list_id",
      });
    }
  }
  PartyList.init(
    {
      list_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      votes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PartyList",
      tableName: "party_lists",
    }
  );
  return PartyList;
};
