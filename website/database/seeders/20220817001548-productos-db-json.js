const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const db = require ('../models')
const dbJson = require('../../data/products-db.json')

module.exports = {
  async up(queryInterface, Sequelize) {
    const category = await db.Category.findAll();
    const colour = await db.Colour.findAll();
    const brand = await db.Brand.findAll();
    const installment = await db.Installment.findAll();
    const style = await db.Style.findAll();

    await queryInterface.bulkInsert(
      "Products",      
      dbJson.map((producto) => {
          return {
            id: uuid(),
            name: producto.nombre ? producto.nombre : 'sin datos',
            description: producto.descripcion ? producto.descripcion : 'sin datos',
            price: producto.precioContado? parseInt(producto.precioContado):'sin datos',
            sale: 0,
            measurements: producto.medidas ? producto.medidas : "sin datos",
            freeDelivery: producto.envioGratis ? parseInt(producto.envioGratis) : "sin datos",
            details: producto.detalles ?  producto.detalles.join(' - ') : "sin datos",
            extraInfo: producto.infoExtra ? producto.infoExtra.join(' - '): 'sin datos',
            picture: producto.imagen ? producto.imagen: '../../public/images/products/default-image.png',
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