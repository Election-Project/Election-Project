"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatbotMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatbotMessage.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  ChatbotMessage.init(
    {
      content: DataTypes.TEXT,
      timestamp: DataTypes.DATE,
      is_from_user: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ChatbotMessage",
    }
  );
  return ChatbotMessage;
};
