"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("advertisements", [
      {
        ad_id: 1,
        national_id: 108685539305,
        name: "شاورما",
        election_slogan: "زيادة مثومه",
        design_type: "square",
        description: "دبل",
        personal_image:
          "https://i.ytimg.com/vi/1G7hD6iYVxQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCNYEFRridXTNt9fKYGZm5s1j5epg",
        color_font: "#ff0000",
        color_card: "#ffffff",
        color_border: "#000000",
        border_type: "dotted",
        total_amount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("advertisements", null, {});
  },
};
