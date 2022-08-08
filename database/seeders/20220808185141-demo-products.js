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
            categoryId: "25532145-efa2-40b1-b4d3-fef9fab664ef",
            colorId: "6ee962cf-c039-4acd-9023-4f7705b734b6",
            brandId: "7d26b51e-6c54-4a5a-8e42-7da50a493aab",
            installmentId: "4f8abd28-ae88-4a9a-be87-7776c9abd87f",
            styleId: "e289c033-4bdb-4117-a23e-94aa4d77d6e9",
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
