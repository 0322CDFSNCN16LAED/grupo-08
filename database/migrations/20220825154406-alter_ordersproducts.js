"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.removeColumn("OrdersProducts", "id");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn("OrdersProducts", "id");
  },
};
