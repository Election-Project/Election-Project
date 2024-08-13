// models/user.js
"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.ElectoralDistrict, { foreignKey: "district_id" });
      User.hasOne(models.Candidate, { foreignKey: "national_id" });
      User.hasOne(models.PartyListCandidate, { foreignKey: "national_id" });
      User.hasMany(models.Advertisement, { foreignKey: "national_id" });
      User.hasMany(models.ContactUsMessage, { foreignKey: "national_id" });
    }

    // Check if the password matches the hashed password in the database
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
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

  User.beforeSave(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return User;
};
