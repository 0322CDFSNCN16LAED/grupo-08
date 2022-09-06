const db = require("../../database/models");
const { Product } = require("../../database/models");

module.exports = {
    list: async (req,res) => {

        try {        
           const { rows, count } = await Product.findAndCountAll({ 
           limit: 5,
           attributes: ["id","name","description","picture"]
          })
              res.status(200).json({ //el resultado es un objeto que tienen las propiedades de meta y data
                  meta:{
                      status: 200,
                      url: req.originalUrl,
                      total: count // todos los elementos que me da la tabla 
                  },
                  data: rows, // seria el array de productos
              });
          } catch (error) {
            console.error(error);
            res.status(500).json({ 
                meta: {
                    status: 500,
                    url: req.originalUrl,
                    //error: error,
                    errorName: error.name,
                    errorMsg: error.msg,
                }
            })
        };
    },
   detail: async function (req,res) {
        let {id, name, picture} = await db.Product.findByPk(req.params.id,{

        },{
            where: {id: req.params.id} // le indico la incidencia que hay entre el que se trae por registro y el de params 
        });
            res.send({id, name, picture});
    }
    /*detail: async function (req,res) {
        let productId = req.params.id
        try{
            const product = await Product.findByPk(productId)
            if(product){
                await product.setCategory
            }
        }*/

}