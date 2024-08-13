const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Ensure environment variables are loaded

const databaseUrl = `postgres://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASS
)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
});

// Import the User model
const User = require("./user")(sequelize, DataTypes);

// Define models
const models = {
  User,
};

// Set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { ...models, sequelize };
