"use strict";
module.exports = (sequelize, DataTypes) => {
  const ElectionResult = sequelize.define(
    "ElectionResult",
    {
      GovernorateID: DataTypes.INTEGER,
      ListID: DataTypes.INTEGER,
      VotesCount: DataTypes.INTEGER,
    },
    {}
  );

  ElectionResult.associate = function (models) {
    ElectionResult.belongsTo(models.Governorate, {
      foreignKey: "GovernorateID",
      onDelete: "CASCADE",
    });
    ElectionResult.belongsTo(models.ElectionList, {
      foreignKey: "ListID",
      onDelete: "CASCADE",
    });
  };

  return ElectionResult;
};
