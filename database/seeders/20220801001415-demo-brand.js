'use strict';
const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Brands',
      Array(50)
          .fill(0)
          .map(() => {
              return {
                id: uuid(),
                name: faker.company.name()
  }
})
)},

  async down (queryInterface, Sequelize) {
 await queryInterface.bulkDelete('Brands', null, {});
 
  }
};
