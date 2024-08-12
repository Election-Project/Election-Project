"use strict";
module.exports = (sequelize, DataTypes) => {
  const ElectoralDistrict = sequelize.define(
    "ElectoralDistrict",
    {
      DistrictName: DataTypes.STRING,
      GovernorateID: DataTypes.INTEGER,
    },
    {}
  );

  ElectoralDistrict.associate = function (models) {
    ElectoralDistrict.belongsTo(models.Governorate, {
      foreignKey: "GovernorateID",
      onDelete: "CASCADE",
    });
    ElectoralDistrict.hasMany(models.User, {
      foreignKey: "ElectoralDistrictID",
    });
    ElectoralDistrict.hasMany(models.ElectionList, {
      foreignKey: "ElectoralDistrictID",
    });
  };

  return ElectoralDistrict;
};
