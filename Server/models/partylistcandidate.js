"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PartyListCandidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PartyListCandidate.belongsTo(models.User, { foreignKey: "national_id" });
      PartyListCandidate.belongsTo(models.PartyList, {
        foreignKey: "party_list_id",
      });
    }
  }
  PartyListCandidate.init(
    {
      rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PartyListCandidate",
    }
  );
  return PartyListCandidate;
};
