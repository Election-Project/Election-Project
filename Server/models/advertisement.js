"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the association with the User model
      Advertisement.belongsTo(models.User, {
        foreignKey: "national_id",
        as: "user", // Alias for the association
      });
    }
  }

  Advertisement.init(
    {
      ad_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      national_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "users",
          key: "national_id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      payment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Advertisement",
      tableName: "advertisements",
      timestamps: true,
    }
  );

  return Advertisement;
};
