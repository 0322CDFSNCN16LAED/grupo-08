const db = require("../../database/models");
const { Product } = require("../../database/models");

module.exports = {
    list: (req,res) => {
        Product.findAndCountAll({
            attributes: ["id","name","description","picture"]
        }).then(({ rows, count }) => {
            res.status(200).json({
                meta:{
                    status: 200,
                    url: req.originalUrl,
                    total: count
                },
                data: rows,
            });
        }).catch((error)=>{
            console.error(error);
            res.status(500).json({
                meta: {
                    status: 500,
                    url: req.originalUrl,
                    errorName: error.name,
                    errorMsg: error.msg,
                }
            })
        });
    },
    detail: async function (req,res) {
        let {id, name, picture} = await db.Product.findByPk(req.params.id,{

        }, {where: {id: req.params.id}});
            res.send({});
    },
};