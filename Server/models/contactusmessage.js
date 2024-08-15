"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContactUsMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContactUsMessage.belongsTo(models.User, { foreignKey: "national_id" });
    }
  }
  ContactUsMessage.init(
    {
      content: DataTypes.TEXT,
      timestamp: DataTypes.DATE,
      is_from_user: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ContactUsMessage",
    }
  );
  return ContactUsMessage;
};
