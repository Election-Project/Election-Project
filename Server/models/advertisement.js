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
      Advertisement.belongsTo(models.User, { foreignKey: "national_id" });
    }
  }
  Advertisement.init(
    {
      content: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      payment_amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Advertisement",
    }
    
  );


  return Advertisement;
};
