"use strict";
/** @type {import('sequelize-cli').Seed} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("electoral_districts", [
      {
        name: "الدائرة الانتخابية الأولى - عمان",
        city: "عمان",
        number_of_seats: 6,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الثانية - عمان",
        city: "عمان",
        number_of_seats: 8,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الثالثة - عمان",
        city: "عمان",
        number_of_seats: 6,
        Female_seat: true,
        Circassian_or_Chechen_seat: true,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الاولى - اربد",
        city: "اربد",
        number_of_seats: 8,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الثانية - اربد",
        city: "اربد",
        number_of_seats: 7,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - الزرقاء",
        city: "الزرقاء",
        number_of_seats: 10,
        Female_seat: true,
        Circassian_or_Chechen_seat: true,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - البلقاء",
        city: "البلقاء",
        number_of_seats: 8,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - الكرك",
        city: "الكرك",
        number_of_seats: 8,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - عجلون",
        city: "عجلون",
        number_of_seats: 4,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - مادبا",
        city: "مادبا",
        number_of_seats: 4,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - معان",
        city: "معان",
        number_of_seats: 4,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - جرش",
        city: "جرش",
        number_of_seats: 4,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - المفرق",
        city: "المفرق",
        number_of_seats: 4,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - الطفيلة",
        city: "الطفيلة",
        number_of_seats: 4,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - العقبة",
        city: "العقبة",
        number_of_seats: 3,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - بدو الشمال",
        city: "بدو الشمال",
        number_of_seats: 3,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - بدو الوسط",
        city: "بدو الوسط",
        number_of_seats: 3,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الدائرة الانتخابية الأولى - بدو الجنوب",
        city: "بدو الجنوب",
        number_of_seats: 3,
        Female_seat: true,
        Circassian_or_Chechen_seat: false,
        Christian_seat: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("electoral_districts", null, {});
  },
};
