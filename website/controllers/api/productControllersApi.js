const db = require("../../database/models");
<<<<<<< HEAD
const { Product, sequelize } = require("../../database/models");

const productControllers = require("../productControllers");

module.exports = {
  list: async (req, res) => {
    const limit = 50;
    const offset = req.query.page ?? 0;
    try {
      // all products
      const { rows, count } = await Product.findAndCountAll({
        attributes: ["id", "name", "description", "picture"],
        include: ["Category", "Colour", "Style", "Installment", "Brand"],
        order: [["name", "ASC"]],
      });
=======

module.exports = {
    list: async (req,res) => {
        const limit = 50;
        const offset = req.query.page ?? 0;
        try {        
           const { rows, count } = await db.Product.findAndCountAll({ 
           limit: limit,
           offset: offset * limit,
           attributes: ["id","name","description", "price", "sale", "categoryId", "styleId" ]
          })
              res.status(200).json({ //el resultado es un objeto que tienen las propiedades de meta y data
                  meta:{
                      status: 200,
                      url: req.originalUrl,
                      total: count, // todos los elementos que me da la tabla 
                      
                  },
                  rows: rows.map((product) =>({
                   // category: product.categoryId,
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.categoryId,
                    style: product.styleId,
                    price: product.price,
                    sale: product.sale,
                    urlcita:`http://localhost:3005/api/products/${product.id}`,
                 })),
          })} 
>>>>>>> 254f4ecf3e8817214b06ac7c737e4035a7764a01

      // totales por categoria
      const totalByCategory = await Product.findAll({
        group: ["Category.name"],
        attributes: [
          "Category.name",
          [sequelize.fn("COUNT", "Category.name"), "TotalCategory"],
        ],
        include: ["Category"],
      });

<<<<<<< HEAD
      res.status(200).json({
        //el resultado es un objeto que tienen las propiedades de meta y data
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: {
          total: count,
          countByCategory: totalByCategory,
          products: rows.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.name,
            url: `http://localhost:3005/api/products/${product.id}`,
            Category: product.Category,
            Colour: product.Colour,
            Style: product.Style,
            Installment: product.Installment,
            Brand: product.Brand,
          })),
        },
      });
    } catch (error) {
      console.error(error);
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
      });
      res.status(200).json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: {
          id: product.id,
          name: product.name,
          description: product.name,
          price: product.price,
          sale: product.sale,
          freeDelivery: product.freeDelivery,
          measurements: product.measurements,
          details: product.details,
          extraInfo: product.extraInfo,
          categoryId: product.categoryId,
          styleId: product.styleId,
          installmentId: product.installmentId,
          brandId: product.brandId,
          colourId: product.colourId,
          picture: `http://localhost:3005/${product.picture}`,
          Rooms: product.Rooms,
          Orders: product.Orders,
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
  /*category: async function (req,res){
=======
        },{
            where: {id: req.params.id} // le indico la incidencia que hay entre el que se trae por registro y el de params 
        });
            res.send(productToFind);
    },
    detailcateg: async function (req,res) {
        db.Product.findAll({where: {categoryId: req.params.categoryId} // le indico la incidencia que hay entre el que se trae por registro y el de params 
        })
        .then(product => {
            return res.status(200).json({ //el resultado es un objeto que tienen las propiedades de meta y data
            total:product.length,
            data: product,
            status: 200
           })
        })
    },
    /*category: async function (req,res){
>>>>>>> 254f4ecf3e8817214b06ac7c737e4035a7764a01
        try {   
           const {rows, count} = await db.Product.findAndCountAll({
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
