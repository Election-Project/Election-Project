"use strict";
module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define(
    "Candidate",
    {
      UserID: DataTypes.INTEGER,
      ListID: DataTypes.INTEGER,
      CandidacyStatus: DataTypes.STRING,
    },
    {}
  );

  Candidate.associate = function (models) {
    Candidate.belongsTo(models.User, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
    });
    Candidate.belongsTo(models.ElectionList, {
      foreignKey: "ListID",
      onDelete: "CASCADE",
    });
    Candidate.hasOne(models.Advertisement, {
      foreignKey: "CandidateID",
    });
  };

  return Candidate;
};
