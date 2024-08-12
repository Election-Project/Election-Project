"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      NationalID: DataTypes.STRING,
      Password: DataTypes.STRING,
      Role: DataTypes.STRING,
      ElectoralDistrictID: DataTypes.INTEGER,
      ContactInfo: DataTypes.TEXT,
      DateRegistered: DataTypes.DATE,
      Status: DataTypes.STRING,
    },
    {}
  );

  User.associate = function (models) {
    User.belongsTo(models.ElectoralDistrict, {
      foreignKey: "ElectoralDistrictID",
      onDelete: "CASCADE",
    });
    User.hasMany(models.Vote, {
      foreignKey: "UserID",
    });
    User.hasOne(models.Candidate, {
      foreignKey: "UserID",
    });
    User.hasMany(models.Inquiry, {
      foreignKey: "UserID",
    });
    User.hasMany(models.Inquiry, {
      foreignKey: "AdminID",
    });
    User.hasOne(models.AdminDashboard, {
      foreignKey: "AdminID",
    });
  };

  return User;
};
