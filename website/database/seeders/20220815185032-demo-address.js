const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const db = require ('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await db.User.findAll();
    await queryInterface.bulkInsert(
      "Address",
      Array(50)
        .fill(0)
        .map(() => {
          return {
            id: uuid(),
            userId: users[Math.floor(Math.random() * users.length)].id,
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            zipcode: 1234,
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Address", null, {});
  },
};
