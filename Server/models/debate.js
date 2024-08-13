"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Debate.belongsToMany(models.Candidate, { through: "DebateParticipant" });
    }
  }
  Debate.init(
    {
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      payment_amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Debate",
    }
  );
  return Debate;
};
