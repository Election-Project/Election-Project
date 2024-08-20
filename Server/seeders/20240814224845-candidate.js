"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("candidates", [
      {
        national_id: "952904263189",
        list_id: 9,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "818300110787",
        list_id: 9,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ///////////////////
      {
        national_id: "103793981814",
        list_id: 1,
        votes: 300,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "104056870650",
        list_id: 1,
        votes: 150,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "104463004618",
        list_id: 1,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "104855557116",
        list_id: 1,
        votes: 250,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "106734906699",
        list_id: 1,
        votes: 400,
        religion: "Christian",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "108685539303",
        list_id: 1,
        votes: 500,
        religion: "Christian",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "108685539304",
        list_id: 1,
        votes: 100,
        religion: "circassian_chechen",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "108685539305",
        list_id: 1,
        votes: 450,
        religion: "circassian_chechen",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "178903617607",
        list_id: 1,
        votes: 600,
        religion: "female_quota",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "193529598148",
        list_id: 1,
        votes: 200,
        religion: "female_quota",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //lit2
      {
        national_id: "196684318148",
        list_id: 2,
        votes: 200,
        religion: "circassian_chechen",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "196684318149",
        list_id: 2,
        votes: 200,
        religion: "female_quota",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "197445728965",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "532768350333",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "536720543552",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "540524148925",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "540825337097",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "545590787177",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "547252269295",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "926612510550",
        list_id: 2,
        votes: 200,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "926701701281",
        list_id: 2,
        votes: 200,
        religion: "Christian",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "931005087302",
        list_id: 2,
        votes: 200,
        religion: "Christian",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "940169040918",
        list_id: 2,
        votes: 200,
        religion: "circassian_chechen",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "935699781383",
        list_id: 2,
        votes: 200,
        religion: "female_quota",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //list6
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Muslim",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Christian",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "Christian",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "circassian_chechen",
      //   gender: "Male",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   national_id: "818300110787",
      //   list_id: 6,
      //   votes: 200,
      //   religion: "female_quota",
      //   gender: "Female",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      //////////////////

      {
        national_id: "108685539303",
        list_id: 10,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "271820688654",
        list_id: 10,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "196684318147",
        list_id: 11,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "460670134241",
        list_id: 11,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "258798930892",
        list_id: 12,
        votes: 0,
        religion: "Muslim",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "852801003318",
        list_id: 12,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "952904263190",
        list_id: 5,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "818300110788",
        list_id: 5,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "108685539304",
        list_id: 6,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "271820688655",
        list_id: 6,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "196684318148",
        list_id: 7,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "460670134242",
        list_id: 7,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "258798930893",
        list_id: 8,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "852801003319",
        list_id: 8,
        votes: 0,
        religion: "Muslim",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        national_id: "952904263191",
        list_id: 2,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "818300110789",
        list_id: 2,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ////////////////////////////////////////////////////////////////
      {
        national_id: "108685539305",
        list_id: 1,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "271820688656",
        list_id: 1,
        votes: 0,
        religion: "Muslim",
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      ////////////////////////////////////////////////////////////////
      {
        national_id: "196684318149",
        list_id: 3,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "460670134243",
        list_id: 3,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "258798930894",
        list_id: 4,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "852801003320",
        list_id: 4,
        votes: 0,
        religion: "Muslim",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("candidates", null, {});
  },
};
