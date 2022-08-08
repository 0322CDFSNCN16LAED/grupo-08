'use strict';
const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Users',
        Array(50)
          .fill(0)
          .map(() => {
              return {
                id: uuid(),
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.number(),
                profilePic: null,    
              };
      })  
    );
  },
          
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users', null, {});
    
  }
};
