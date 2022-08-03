'use strict';
const { v4 } = require("uuid");
const uuid = v4;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('userRoles', [{
      id: uuid(),
      name: 'user'
    },{
      id: uuid(),
      name: 'seller'
    },{
      id: uuid(),
      name: 'admin'
    }], {});
      },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('userRoles', null, {});
     
  }
};
