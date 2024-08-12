'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdminDashboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AdminID: {
        type: Sequelize.INTEGER
      },
      TotalVoters: {
        type: Sequelize.INTEGER
      },
      TotalCandidates: {
        type: Sequelize.INTEGER
      },
      ActiveElections: {
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdminDashboards');
  }
};