const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        id: uuid(),
        orderDate: '2022-12-01 12:12:00',
        orderTotal: faker.commerce.price(),
        userId: 'a364c0b3-9caf-4ac1-a51a-1a9c4adaa703'
      },
      {
        id: uuid(),
        orderDate: '2021-11-11 11:11:00',
        orderTotal: faker.commerce.price(),
        userId: '8be517d3-09b8-425f-a743-f96ff52695fb'
      },
      {
        id: uuid(),
        orderDate: '2020-10-10 10:10:00',
        orderTotal: faker.commerce.price(),
        userId: '31948f2f-d4ef-4a2d-8c37-ffbe619b41dc'
      },
      {
        id: uuid(),
        orderDate: '2019-09-09 11:00:00',
        orderTotal: faker.commerce.price(),
        userId: '31948f2f-d4ef-4a2d-8c37-ffbe619b41dc'
      },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
    
  }
};
