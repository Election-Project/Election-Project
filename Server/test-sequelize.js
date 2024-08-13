// test-sequelize.js
const { Sequelize } = require("sequelize");

const databaseUrl = "postgres://abd:Abd2001%40@localhost:5432/Election";

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
