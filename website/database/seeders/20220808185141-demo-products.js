const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const category = await db.Category.findAll();
    const colour = await db.Colour.findAll();
    const brand = await db.Brand.findAll();
    const installment = await db.Installment.findAll();
    const style = await db.Style.findAll();

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
            sale: 0.35,
            measurements: faker.commerce.productDescription(),
            freeDelivery: faker.datatype.boolean(),
            details: faker.commerce.productMaterial(),
            extraInfo: faker.commerce.productDescription(),
            picture: "/images/products/lamp.jpg",
            categoryId: category[0].id,
            colourId: colour[0].id,
            brandId: brand[0].id,
            installmentId: installment[0].id,
            styleId: style[0].id,
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
