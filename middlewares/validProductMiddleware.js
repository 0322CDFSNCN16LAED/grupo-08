const database = require("../database/models"); //Requerimos la DB de Sequelize

module.exports = async (req, res, next) => {
  const product = await database.Product.findOne({
    where: {
      id: req.params.id
    }
  })
  if (product) {
    next();
  } else {
    res.redirect("/not-found");
  }
};
