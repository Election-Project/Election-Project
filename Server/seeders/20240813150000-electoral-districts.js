"use strict";
/** @type {import('sequelize-cli').Seed} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("electoral_districts", [
      {
        name: "الدائرة الانتخابية الأولى - عمان",
        city: "عمان",
        number_of_seats: 5,
        Female_seat: false,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الثانية - عمان",
        city: "عمان",
        number_of_seats: 5,
        Female_seat: false,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - الزرقاء",
        city: "الزرقاء",
        number_of_seats: 5, // ثلاثة نواب مسلمين، نائب مسيحي، ونائب شركسي أو شيشاني
        Female_seat: false,
        Circassian_or_Chechen_seat: true,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("electoral_districts", null, {});
  },
};
