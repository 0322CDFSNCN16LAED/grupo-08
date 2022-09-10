const db = require("../database/models");
const { Op } = require("sequelize");

// Listar productos por ambiente, por estilo, por categoria, por sale

module.exports = {
 /* rooms: async (req, res) => {
    const limit = 10;
    const offset = req.query.page ?? 0;
    try {
      products = await db.Product.findAndCountAll({
        limit: 5,
        offset: offset * limit,
        attributes: ["id", "name", "categoryId","styleId", "roomsId?¿?¿"],
        where: { "roomsId?¿?¿?": req.params.id },
      });

      res.send({ products });
    } catch (error) {
      res.send(error);
    }
  },
  */
  styles: async (req, res) => {
    const limit = 5;
    const offset = req.query.page ?? 0;
    try {
      products = await db.Product.findAndCountAll({
        limit: 5,
        offset: offset * limit,
        attributes: ["id", "name", "styleId"],
        where: { "styleId": req.params.id },
      });

      res.send({ products });
    } catch (error) {
      res.send(error);
    }
  },
  categories: async(req, res) => {
    const limit = 10;
    const offset = req.query.page ?? 0;
    try {
      let {rows, count} = await db.Product.findAndCountAll({
        limit: 5,
        offset: offset * limit,
        where: { "categoryId": req.params.id },
      });

      res.render(  'products/list-products', { count, productos: rows });
    } catch (error) {
      res.send(error);
    }
  },
  inSale: async (req, res) => {
    const limit = 10;
    const offset = req.query.page ?? 0;
    try {
      products = await db.Product.findAndCountAll({
        limit: 5,
        offset: offset * limit,
        where: { [Op.gt]: 0, },
      });

      res.send({ products });
    } catch (error) {
      res.send(error);
    }
  },
};
