"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("advertisements", [
      {
        national_id: "123456789019",
        content: "Sample advertisement content 1",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 100.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 2",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 200.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more records here with valid `national_id` values
      {
        national_id: "123456789019",
        content: "Sample advertisement content 3",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 150.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 4",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 250.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 5",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 300.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 6",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 350.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 7",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 400.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 8",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 450.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 9",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 500.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        national_id: "123456789019",
        content: "Sample advertisement content 10",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        payment_amount: 550.0,
        image:
          "https://img.freepik.com/premium-photo/sudan-polling-station-with-many-voting-booths-election-concept-3d-illustration_764664-34465.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("advertisements", null, {});
  },
};
