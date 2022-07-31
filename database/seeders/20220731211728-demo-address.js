'use strict';
const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Address',
      Array(50)
          .fill(0)
          .map(() => {
              return {
                id: uuid(),
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
                zipcode: faker.address.zipCode(),

    };
  })  
  );
},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Address', null, {});
    
  }
};
