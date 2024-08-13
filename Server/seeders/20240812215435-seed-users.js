"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          Name: "Alice Johnson",
          Email: "alice.johnson@example.com",
          NationalID: "NID001",
          Password: "hashed_password_1",
          Role: "Voter",
          ElectoralDistrictID: 1,
          ContactInfo: "789 Pine St",
          DateRegistered: new Date(),
          Status: "Active",
          createdAt: new Date(), // Add this line
          updatedAt: new Date(), // Add this line
        },
        {
          Name: "Bob Smith",
          Email: "bob.smith@example.com",
          NationalID: "NID002",
          Password: "hashed_password_2",
          Role: "Candidate",
          ElectoralDistrictID: 2,
          ContactInfo: "456 Maple Ave",
          DateRegistered: new Date(),
          Status: "Active",
          createdAt: new Date(), // Add this line
          updatedAt: new Date(), // Add this line
        },
        {
          Name: "Charlie Brown",
          Email: "charlie.brown@example.com",
          NationalID: "NID003",
          Password: "hashed_password_3",
          Role: "Admin",
          ElectoralDistrictID: null,
          ContactInfo: "123 Oak Dr",
          DateRegistered: new Date(),
          Status: "Active",
          createdAt: new Date(), // Add this line
          updatedAt: new Date(), // Add this line
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
