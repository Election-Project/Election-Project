"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("local_lists", [
      // District 1 (عمان - الأولى)
      {
        name: "قائمة التنمية - عمان الأولى",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة الإصلاح - عمان الأولى",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة المستقبل - عمان الأولى",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة الوحدة - عمان الأولى",
        district_id: 1,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // District 2 (عمان - الثانية)
      {
        name: "قائمة النهضة - عمان الثانية",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة العدالة - عمان الثانية",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة الأمل - عمان الثانية",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة التغيير - عمان الثانية",
        district_id: 2,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // District 3 (الزرقاء - الأولى)
      {
        name: "قائمة التقدم - الزرقاء الأولى",
        district_id: 3,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة الوطن - الزرقاء الأولى",
        district_id: 3,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة الإنجاز - الزرقاء الأولى",
        district_id: 3,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "قائمة الشباب - الزرقاء الأولى",
        district_id: 3,
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
