const express = require("express");
const router = express.Router();
const path = require('path');

/*GUARDADO DE ARCHIVOS QUE VENGAN POR EL FORMULARIO DE REGISTER */
/*Requerimos Multer para que el register acepte imagenes de perfil */
const multer =require('multer');
/*Definimos un storage para las imagenes de perfil */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/usersProfiles');
    },
    filename: (req, file, cb) => {
        let profileImgName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, profileImgName);
    }
})
const uploadFile = multer({storage});

const usersControllers = require("../controllers/usersControllers"); 

/*RUTAS */
/*Listado de todos los usuarios */
router.get("/", usersControllers.index);
/*Login*/
router.get("/login", usersControllers.login);
 
/*Mostrar formulario de registro de usuarios */
router.get("/register", usersControllers.showRegister);
/*Guardar usuario nuevo */
router.post("/register", uploadFile.single('profile'), usersControllers.register);

/* Detalle de un usuario */
router.get("/:id", usersControllers.detail);

/* Formulario de edicion de usuario */
router.get('/edit/:id', usersControllers.edit);
/* Guardar edición de usuario */
router.put('/:id', usersControllers.update);

/* Borrar usuario */
router.delete ('/:id', usersControllers.delete);

module.exports = router;
