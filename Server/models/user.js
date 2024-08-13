"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.ElectoralDistrict, { foreignKey: "district_id" });
      User.hasOne(models.Candidate, { foreignKey: "national_id" });
      User.hasOne(models.PartyListCandidate, { foreignKey: "national_id" });
      User.hasMany(models.Vote, { foreignKey: "voter_national_id" });
      User.hasMany(models.Advertisement, { foreignKey: "national_id" });
      User.hasMany(models.ChatbotMessage, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      national_id: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      full_name: DataTypes.STRING,
      user_type: DataTypes.ENUM("voter", "candidate", "admin"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
