"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.removeColumn("RoomsProducts", "id");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("RoomsProducts", "id");
  },
};
