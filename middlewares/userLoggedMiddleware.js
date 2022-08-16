const database = require("../database/models"); //Requerimos la DB de Sequelize

module.exports = async function (req, res, next) {
  res.locals.isLogged = false;
  let emailInCookie = req.cookies.userEmail;
  if( userFromCookie = await database.User.findOne({
    where : {
      email: emailInCookie
    }
  }))
  if (userFromCookie) {
    req.session.userLogged = userFromCookie; // lo mando a session
  }
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
};

//// VERSION CON BASE DE DATOS JSON ///
const db = require("../data/db-users");

module.exports = function (req, res, next) {
  res.locals.isLogged = false;
  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = db.getByField("email", emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie; // lo mando a session
  }
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
};
