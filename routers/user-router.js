const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

/*Login*/
router.get("/login", usersControllers.login);
 
/*Mostrar formulario de registro de usuarios */
router.get("/register", usersControllers.showRegister);
/*Guardar usuario nuevo */
router.post("/register", usersControllers.register);

/*Listado de todos los usuarios */
router.get("/", usersControllers.index);
/* Detalle de un usuario */
router.get("/:id", usersControllers.detail);

/* Formulario de edicion de usuario */
router.get('/edit/:id', usersControllers.edit);
/* Guardar edición de usuario */
router.put('/:id', usersControllers.update);

/* Borrar usuario */
router.delete ('/:id', usersControllers.delete);

module.exports = router;
