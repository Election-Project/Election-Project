"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("party_lists", [
      {
        name: "حزب الميثاق",
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "حزب الشورى الاردني",
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "حزب الوفاء الوطني",
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "حزب الارض المباركة",
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("party_lists", null, {});
  },
};
