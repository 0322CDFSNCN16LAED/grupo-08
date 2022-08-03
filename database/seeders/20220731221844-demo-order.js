'use strict';
const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      Array(50)
          .fill(0)
          .map(() => {
              return {
                id: uuid(),
                orderDate: faker.date.past(),
                orderTotal: faker.commerce.price() ,
              }})
     
     );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
    
  }
};
