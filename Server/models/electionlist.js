"use strict";
module.exports = (sequelize, DataTypes) => {
  const ElectionList = sequelize.define(
    "ElectionList",
    {
      ListName: DataTypes.STRING,
      ElectoralDistrictID: DataTypes.INTEGER,
      ListType: DataTypes.STRING,
    },
    {}
  );

  ElectionList.associate = function (models) {
    ElectionList.belongsTo(models.ElectoralDistrict, {
      foreignKey: "ElectoralDistrictID",
      onDelete: "CASCADE",
    });
    ElectionList.hasMany(models.Candidate, {
      foreignKey: "ListID",
    });
    ElectionList.hasMany(models.Vote, {
      foreignKey: "ListID",
    });
    ElectionList.hasMany(models.ElectionResult, {
      foreignKey: "ListID",
    });
  };

  return ElectionList;
};
