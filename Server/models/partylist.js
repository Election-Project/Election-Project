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
      PartyList.hasMany(models.Vote, { foreignKey: "party_list_id" });
    }
  }
  PartyList.init(
    {
      name: DataTypes.STRING,
      votes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PartyList",
    }
  );
  return PartyList;
};
