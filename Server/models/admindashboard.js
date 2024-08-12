"use strict";
module.exports = (sequelize, DataTypes) => {
  const AdminDashboard = sequelize.define(
    "AdminDashboard",
    {
      AdminID: DataTypes.INTEGER,
      TotalVoters: DataTypes.INTEGER,
      TotalCandidates: DataTypes.INTEGER,
      ActiveElections: DataTypes.INTEGER,
      Date: DataTypes.DATE,
    },
    {}
  );

  AdminDashboard.associate = function (models) {
    AdminDashboard.belongsTo(models.User, {
      foreignKey: "AdminID",
      onDelete: "CASCADE",
    });
  };

  return AdminDashboard;
};
