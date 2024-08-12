"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    "Vote",
    {
      UserID: DataTypes.INTEGER,
      ListID: DataTypes.INTEGER,
      VoteDate: DataTypes.DATE,
    },
    {}
  );

  Vote.associate = function (models) {
    Vote.belongsTo(models.User, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
    });
    Vote.belongsTo(models.ElectionList, {
      foreignKey: "ListID",
      onDelete: "CASCADE",
    });
  };

  return Vote;
};
