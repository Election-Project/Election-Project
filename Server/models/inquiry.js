"use strict";
module.exports = (sequelize, DataTypes) => {
  const Inquiry = sequelize.define(
    "Inquiry",
    {
      UserID: DataTypes.INTEGER,
      AdminID: DataTypes.INTEGER,
      Message: DataTypes.TEXT,
      Response: DataTypes.TEXT,
      InquiryDate: DataTypes.DATE,
    },
    {}
  );

  Inquiry.associate = function (models) {
    Inquiry.belongsTo(models.User, {
      foreignKey: "UserID",
      onDelete: "CASCADE",
    });
    Inquiry.belongsTo(models.User, {
      foreignKey: "AdminID",
      onDelete: "CASCADE",
    });
  };

  return Inquiry;
};
