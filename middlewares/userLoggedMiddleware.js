const db = require("../data/db-users");

function userLoggedMiddleware (req,res, next){
    res.locals.isLogged = false; //comparto a nivel global esta variable con false

    let emailInCookie = req.cookies.userEmail; //voy a traer desde el controlador, el mail guardado en la cookie
    let userFromCookie = db.getByField('email', emailInCookie); // lo busco en la DB
 
    if (userFromCookie){ // Si hay un mail en la cookie que este en la base de datos
        res.session.userLogged = userFromCookie; // lo mando a session
    } 
    if (req.session.userLogged){ // si hay alguien loggeado
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}
///module.exports = userLoggedMiddleware;