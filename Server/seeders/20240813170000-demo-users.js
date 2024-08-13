"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const generateRandom12DigitID = () => {
      return Math.floor(100000000000 + Math.random() * 900000000000).toString();
    };

    const generateUniqueEmail = (index) => `user_election${index}@gmail.com`;

    const users = [
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(1),
        full_name: "ابراهيم احمد ابراهيم العيسه",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(2),
        full_name: "اباء ابراهيم عبد الرحمن الخطيب",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(3),
        full_name: "ابراهيم احمد محمد جادو",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(4),
        full_name: "راما خليل موسى الغويري",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(5),
        full_name: "اسلام فراس نواف المنور",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(6),
        full_name: "بكر يوسف عبد السلام العويص",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(7),
        full_name: "بلال احمد جميل السفاريني",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(8),
        full_name: "بهاء جهاد احمد الصبيحات",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: "islamomar0003@gmail.com",
        full_name: "اسلام عمر حافظ اسماعيل",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(9),
        full_name: "ثائر خليل سعيد ابو السعود",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: generateRandom12DigitID(),
        password: "",
        email: generateUniqueEmail(10),
        full_name: "تيسير موسى احمد حماد",
        user_type: "voter",
        district_id: 3,
        is_voted_local: false,
        is_voted_party: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
