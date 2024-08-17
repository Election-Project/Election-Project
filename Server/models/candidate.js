"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Candidate.belongsTo(models.User, { foreignKey: "national_id" });
      Candidate.belongsTo(models.LocalList, { foreignKey: "list_id" });
      Candidate.belongsToMany(models.Debate, { through: "DebateParticipant" });
    }
  }
  Candidate.init(
    {
      candidate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      votes: DataTypes.INTEGER,
      religion: DataTypes.ENUM(
        "Muslim",
        "Christian",
        "circassian_chechen",
        "female_quota"
      ),
      gender: DataTypes.ENUM("Male", "Female"),
    },
    {
      sequelize,
      modelName: "Candidate",
      tableName: "candidates",
    }
  );
  return Candidate;
};
