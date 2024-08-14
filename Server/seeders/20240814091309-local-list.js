"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("local_lists", [
      // District 6 (عمان - الأولى)
      {
        name: "عزم",
        district_id: 6,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // الوطني الاسلامي
      {
        name: "الوطني الاسلامي",
        district_id: 6,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // جبهة العمل الاسلامي
      {
        name: "جبهة العمل الاسلامي",
        district_id: 6,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // تقدم
      {
        name: "تقدم",
        district_id: 6,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الهمة",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // العهد
      {
        name: "العهد",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // عمان
      {
        name: "عمان",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // المستقبل
      {
        name: "المستقبل",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "الكرامة",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // الحق
      {
        name: "الحق",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // نمو
      {
        name: "نمو",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // الاتحاد
      {
        name: "الاتحاد",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("local_lists", null, {});
  },
};
