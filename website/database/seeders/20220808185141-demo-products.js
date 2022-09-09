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
            sale: (Math.random()),
            measurements: faker.commerce.productDescription(),
            freeDelivery: faker.datatype.boolean(),
            details: faker.commerce.productMaterial(),
            extraInfo: faker.commerce.productDescription(),
            picture: "/images/products/lamp.jpg",
            categoryId: category[Math.floor(Math.random() * category.length)].id,
            colourId: colour[Math.floor(Math.random() * colour.length)].id,
            brandId: brand[Math.floor(Math.random() * brand.length)].id,
            installmentId: installment[Math.floor(Math.random() * installment.length)].id,
            styleId: style[Math.floor(Math.random() * style.length)].id,
          };
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
