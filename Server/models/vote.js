"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.User, { foreignKey: "voter_national_id" });
      Vote.belongsTo(models.LocalList, { foreignKey: "local_list_id" });
      Vote.belongsTo(models.PartyList, { foreignKey: "party_list_id" });
      Vote.belongsTo(models.Candidate, { foreignKey: "candidate_id" });
    }
  }
  Vote.init(
    {
      is_blank_vote: DataTypes.BOOLEAN,
      timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
