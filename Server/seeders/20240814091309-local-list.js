"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("local_lists", [
      // District 6 (عمان - الأولى)
      {
        name: "عزم",
        district_id: 6,
        votes: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // الوطني الاسلامي
      {
        name: "الوطني الاسلامي",
        district_id: 6,
        votes: 125,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // جبهة العمل الاسلامي
      {
        name: "جبهة العمل الاسلامي",
        district_id: 6,
        votes: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // تقدم
      {
        name: "تقدم",
        district_id: 6,
        votes: 175,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      {
        name: "الهمة",
        district_id: 1,
        votes: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // العهد
      {
        name: "العهد",
        district_id: 1,
        votes: 225,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // عمان
      {
        name: "عمان",
        district_id: 1,
        votes: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // المستقبل
      {
        name: "المستقبل",
        district_id: 1,
        votes: 275,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      {
        name: "الكرامة",
        district_id: 2,
        votes: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // الحق
      {
        name: "الحق",
        district_id: 2,
        votes: 170,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // نمو
      {
        name: "نمو",
        district_id: 2,
        votes: 210,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
      // الاتحاد
      {
        name: "الاتحاد",
        district_id: 2,
        votes: 260,
        createdAt: new Date(),
        updatedAt: new Date(),
        is_approved: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("local_lists", null, {});
  },
};
