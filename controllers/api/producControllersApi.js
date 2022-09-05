const { Product } = require("../../database/models");

module.exports = {
    list: (req,res) => {
        Product.findAndCountAll({
            attributes: ["id","name","description",""]
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
    detail: (req,res) => {
        productToFind = req.params.id == Product.UUID;
        Product.findById({
            productToFind,
        }).then(({ rows }) => {
            res.status(200).json({
                meta:{
                    status: 200,
                    url: req.originalUrl,
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
    }
};