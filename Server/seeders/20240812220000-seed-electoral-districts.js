"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ElectoralDistricts",
      [
        {
          DistrictName: " A",
          GovernorateID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          DistrictName: " B",
          GovernorateID: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ElectoralDistricts", null, {});
  },
};
