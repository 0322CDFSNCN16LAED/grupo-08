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
            categoryId: "4ba517d8-b915-4cbb-8b5f-c12dcd1fcd24",
            colorId: "2180b0ec-f2f3-4ce9-8646-1c0733d039e2",
            brandId: "52dd3d21-969e-4304-9b97-1c361718744d",
            installmentId: "8a987f9e-7125-4db9-807b-a846154d9e4f",
            styleId: "9313c3bf-02a2-4381-b6d4-586f0ef279e8",
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
