"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DebateParticipant extends Model {
    static associate(models) {
      // Define associations here
      DebateParticipant.belongsTo(models.Debate, { foreignKey: "debate_id" });
      DebateParticipant.belongsTo(models.Candidate, {
        foreignKey: "candidate_id",
      });
    }
  }

  DebateParticipant.init(
    {
      debate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Debates",
          key: "debate_id",
        },
      },
      candidate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Candidates",
          key: "candidate_id",
        },
      },
    },
    {
      sequelize,
      modelName: "DebateParticipant",
      tableName: "debate_participants",
      timestamps: false, // Since the original table doesn't have timestamp columns
    }
  );

  return DebateParticipant;
};
