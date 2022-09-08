const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await db.User.findAll();
    await queryInterface.bulkInsert('Orders', [
      {
        id: uuid(),
        orderDate: '2022-12-01 12:12:00',
        orderTotal: faker.commerce.price(),
        userId: users[Math.floor(Math.random() * users.length)].id,
      },
      {
        id: uuid(),
        orderDate: '2021-11-11 11:11:00',
        orderTotal: faker.commerce.price(),
        userId: users[Math.floor(Math.random() * users.length)].id,
      },
      {
        id: uuid(),
        orderDate: '2020-10-10 10:10:00',
        orderTotal: faker.commerce.price(),
        userId: users[Math.floor(Math.random() * users.length)].id,
      },
      {
        id: uuid(),
        orderDate: '2019-09-09 11:00:00',
        orderTotal: faker.commerce.price(),
        userId: users[Math.floor(Math.random() * users.length)].id,
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
