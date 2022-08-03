'use strict';
const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      Array(50)
        .fill(0)
        .map(() => {
            return {
              id: uuid(),
              name: faker.commerce.productName(),
              price: faker.commerce.price(),
              freeDelivery: faker.datatype.boolean(),
              description: faker.commerce.productDescription(),
              measurements: faker.commerce.productDescription(),
              details:faker.commerce.productMaterial(),
              extraInfo: faker.commerce.productDescription() ,
              picture: faker.image.image()
            }
          })
        )},
  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Products', null, {});
                
  }
};
