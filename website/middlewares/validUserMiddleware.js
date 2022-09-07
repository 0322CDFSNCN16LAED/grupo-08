const database = require("../database/models"); //Requerimos la DB de Sequelize

module.exports = async (req, res, next) => {
  const user = await database.User.findOne({
    where: {
      id: req.params.id
    }
  })
  if (user) {
    next();
  } else {
    res.redirect("/not-found");
  }
};


//// VERSION VIEJA CON BASE DE DATOS JSON //
/*
const db = require("../data/db-users");

module.exports = (req, res, next) => {
  const user = db.getOne(req.params.id);

  if (user) {
    next();
  } else {
    res.redirect("/not-found");
  }
};
*/