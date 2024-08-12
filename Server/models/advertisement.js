"use strict";
module.exports = (sequelize, DataTypes) => {
  const Advertisement = sequelize.define(
    "Advertisement",
    {
      CandidateID: DataTypes.INTEGER,
      Content: DataTypes.TEXT,
      PaymentStatus: DataTypes.STRING,
      DisplayStartDate: DataTypes.DATE,
      DisplayEndDate: DataTypes.DATE,
    },
    {}
  );

  Advertisement.associate = function (models) {
    Advertisement.belongsTo(models.Candidate, {
      foreignKey: "CandidateID",
      onDelete: "CASCADE",
    });
  };

  return Advertisement;
};
