const db = require("../../database/models");
const { Product } = require("../../database/models");
const { Category } = require("../../database/models");


module.exports = {
    list: async (req,res) => {
        const limit = 50;
        const offset = req.query.page ?? 0;
        try {        
           const { rows, count } = await Product.findAndCountAll({ 
           limit: limit,
           offset: offset * limit,
           attributes: ["id","name","description","picture", "categoryId"]
          })
              res.status(200).json({ //el resultado es un objeto que tienen las propiedades de meta y data
                  meta:{
                      status: 200,
                      url: req.originalUrl,
                      total: count, // todos los elementos que me da la tabla 
                      //totalByCategory:  
                  },
                  rows: rows.map((product) =>({
                    category: product.categoryId,
                    id: product.id,
                    name: product.name,
                    description: product.name,
                    urlcita:`http://localhost:3005/api/products/${product.id}`
                 })),
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
    },
   detail: async function (req,res) {
        let productToFind = await db.Product.findByPk(req.params.id,{

        },{
            where: {id: req.params.id} // le indico la incidencia que hay entre el que se trae por registro y el de params 
        });
            res.send(productToFind);
    },


    //me esta devolviendo 1... 
    category: async (req,res) => {
        const limit = 10;
        const offset = req.query.page ?? 0;
        try {        
           const { rows, count } = await Product.findAndCountAll({ 
           limit: limit,
           offset: offset * limit,
           attributes: ["categoryId"]
          })
              res.status(200).json({ //el resultado es un objeto que tienen las propiedades de meta y data
                  meta:{
                      status: 200,
                      url: req.originalUrl,
                      total: count, // todos los elementos que me da la tabla 
                      //totalByCategory:  
                  },
                  rows: rows.map((product) =>({
                    category: product.categoryId,
                })),
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
    },





/*

    category: async function (req,res){
        const {rows, count} = await Producto.findAndCountAll({
            attributes: ["categoryId",
             // [sequelize.fn("COUNT", sequelize.col("isActive")), "count_isActive"],
           ]

            //group: "name",
        }) 
          
          res.status(200).json({
            meta:{
                status: 200,
                total: count, // todos los elementos que me da la tabla 
                //totalByCategory:  
            },
            rows: rows.map((category) =>({
                name: category.name,
                 }))
            })
 
    }*/


}
