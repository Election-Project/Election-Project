"use strict";
/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          national_id: "1234567890",
          password: "", // Make sure to hash the password in a real scenario
          email: "islamomarhafith@gmail.com",
          full_name: "islam omar",
          user_type: "voter",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          national_id: "0987654321",
          password: "", // Make sure to hash the password in a real scenario
          email: "islamomar0003@gmail.com",
          full_name: "islam test",
          user_type: "candidate",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more user objects here if needed
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
