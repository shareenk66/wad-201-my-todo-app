"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Todos", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: 5,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Todos", "title", {
      type: Sequelize.STRING,
    });
  },
};
