const db = require("../../database/models");
const { Product, sequelize } = require("../../database/models");

module.exports = {
  list: async (req, res) => {
    const limit = 10;
    const offset = req.query.page ?? 0;
    try {
      // all products
      const { rows, count } = await Product.findAndCountAll({
        attributes: ["id", "name", "description", "price", "sale"],
        include: ["Category", "Colour", "Style", "Installment", "Brand"],
        order: [["name", "ASC"]],
      });

      // totales por categoria --> solo devuelve los totales si tiene productos asociados
      const totalByCategory = await Product.findAll({
        group: ["Category.id"],
        attributes: [
          "Category.id",
          [sequelize.fn("COUNT", "Category.id"), "TotalCategory"],
        ],
        include: ["Category"],
      });
      // cuenta por categoria, pero si categoria no tiene productos esta contando como 1 la categoria y devueve para las q no tienen productos 1
      /*const totalCategory = await db.Category.findAll({
        group: ["id"],
        attributes: [
          "id",
          "name",
          [sequelize.fn("COUNT", "Product.id"), "TotalpructoCategoria"],
        ],
        include: ["Products"],
      });
      res.send(totalCategory);*/
      // este devuelve el total peeero deveulve un array con 2 elemento que tiene lo mismo
      /*const ProductsByCategory = await sequelize.query(
        "SELECT c.name , count(p.id) total  from Categories c left outer join Products p on(c.id=p.categoryId) GROUP by c.name "
      );*/

      res.status(200).json({
        //el resultado es un objeto que tienen las propiedades de meta y data
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        datavalue: {
          count: count,
          countByCategory: totalByCategory,
          products: rows.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            url: `http://localhost:3005/api/products/${product.id}`,
            category: product.Category,
            colour: product.Colour,
            style: product.Style,
            price: product.price,
            sale: product.sale,
            brand: product.Brand,
          })),
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          url: req.originalUrl,
          errorName: error.name,
          errorMsg: error.msg,
        },
      });
    }
  },
  detailprod: async function (req, res) {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: ["Rooms", "Orders"],
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      });
      product.picture = `http://localhost:3005${product.picture}`;
      res.status(200).json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          url: req.originalUrl,
          errorName: error.name,
          errorMsg: error.msg,
        },
      });
    }
  },
  detailcateg: async function (req, res) {
    db.Product.findAll({
      where: { categoryId: req.params.categoryId }, // le indico la incidencia que hay entre el que se trae por registro y el de params
    }).then((product) => {
      return res.status(200).json({
        //el resultado es un objeto que tienen las propiedades de meta y data
        cantidad: product.length,
        data: product,
        status: 200,
      });
    });
  },
  lastProductRegistered: async (req, res) => {
    try {
      let lastProduct = await db.Product.findAll({
        limit: 1,
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "sale",
          "picture",
          "createdAt",
          "measurements",
          "details",
          "extraInfo",
          "freeDelivery",
        ],
        include: [
          "Category",
          "Colour",
          "Style",
          "Installment",
          "Rooms",
          "Brand",
        ],
        order: [["createdAt", "DESC"]],
      });
      lastProduct[0].urlDetail = `http://localhost:3005/api/products/${lastProduct[0].id}`;

      res.status(200).json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: {
          id: lastProduct[0].id,
          name: lastProduct[0].name,
          description: lastProduct[0].description,
          price: lastProduct[0].price,
          sale: lastProduct[0].sale,
          picture: lastProduct[0].picture,
          createdAt: lastProduct[0].createdAt,
          urlDetail: lastProduct[0].urlDetail,
          category: lastProduct[0].Category,
          colour: lastProduct[0].Colour,
          style: lastProduct[0].Style,
          rooms: lastProduct[0].Rooms,
          brand: lastProduct[0].Brand,
          installments: lastProduct[0].Installment,
          measurements: lastProduct[0].measurements,
          details: lastProduct[0].details,
          extraInfo: lastProduct[0].extraInfo,
          freeDelivery: lastProduct[0].freeDelivery,
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          url: req.originalUrl,
          errorName: error.name,
          errorMsg: error.msg,
        },
      });
    }
  },
  productsByCategory: async (req, res) => {
    try {
      const totalByCategory = await Product.findAll({
        group: ["Category.name"],
        attributes: [
          "Category.name",
          [sequelize.fn("COUNT", "Category.name"), "TotalCategory"],
        ],
        include: ["Category"],
      });
      let data = [];

      // let products;
      // products = await Product.findAll();
      //res.send("el elementooooooo-> " + products);
      totalByCategory.forEach(async (element) => {
        //res.send("el elementooooooo-> " + element.Category.id);
        //console.log("pruebw");
        let products = await Product.findAll({
          where: { categoryId: element.Category.id }, //f8ec3cc1-2967-4c89-bf99-aab2932cdd1f
        });
        //console.log(products);
        let elementos = {
          category: element.Category,
          products: products,
        };
        //console.log(elementos);
        data.push(elementos);
        console.log("imprimiendo data -> " + data);
      });
      console.log("lo que tiene data" + data);
      res.send(data);
    } catch (error) {
      res.status(500).json({
        status: 500,
        url: `http://localhost:3005${req.originalUrl}`,
        error: error,
      });
    }
  },
  /*category: async function (req,res){
        try {   
           const {rows, count} = await Product.findAndCountAll({
            attributes: ["categoryId"],
            group: "categoryId",
        
          });
           res.status(200).json({
            meta:{
                
                status: 200,
                total: count, 
            },
            rows: rows.map((category) =>({
                id: category.categoryId,
                
                 }))
            })}
            catch (error) {
                console.error(error);
                res.status(500).json({ 
                    meta: {
                        status: 500,
                        url: req.originalUrl,
                        errorName: error.name,
                        errorMsg: error.msg,
                    }
                })
            };
}*/
};
