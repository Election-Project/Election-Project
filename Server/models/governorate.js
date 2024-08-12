"use strict";
module.exports = (sequelize, DataTypes) => {
  const Governorate = sequelize.define(
    "Governorate",
    {
      GovernorateName: DataTypes.STRING,
    },
    {}
  );

  Governorate.associate = function (models) {
    Governorate.hasMany(models.ElectoralDistrict, {
      foreignKey: "GovernorateID",
    });
    Governorate.hasMany(models.ElectionResult, {
      foreignKey: "GovernorateID",
    });
  };

  return Governorate;
};
