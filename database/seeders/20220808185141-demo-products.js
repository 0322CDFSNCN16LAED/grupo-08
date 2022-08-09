const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      Array(50)
        .fill(0)
        .map(() => {
          return {
            id: uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            measurements: faker.commerce.productDescription(),
            freeDelivery: faker.datatype.boolean(),
            details: faker.commerce.productMaterial(),
            extraInfo: faker.commerce.productDescription(),
            picture: "/images/products/lamp.jpg",
            categoryId: "5c3d9a5b-de96-4675-a1e8-01727754eb31",
            colorId: "2d51d73a-4526-4d71-9bc9-74d28f9d8146",
            brandId: "1bce03d0-6bee-4cfb-809e-3ff865a284e9",
            installmentId: "488442cf-b2a9-4039-85a3-ef3c48a9357b",
            styleId: "abb40933-3c3f-4825-958e-09d51fb1d053",
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
