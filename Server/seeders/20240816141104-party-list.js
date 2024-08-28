"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("party_lists", [
      {
        name: "حزب الميثاق",
        votes: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      {
        name: "حزب الشورى الاردني",
        votes: 700,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      {
        name: "حزب الوفاء الوطني",
        votes: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      {
        name: "حزب الارض المباركة",
        votes: 900,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("party_lists", null, {});
  },
};
