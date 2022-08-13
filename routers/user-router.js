const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


// Middlewares
const basicRegisterValidations = require("../validation/userValidations");
const loginValidations = require("../validation/loginValidation");
// si esta logueado lo envia a la vista de su detalle
const guestMiddleware = require("../middlewares/guestMiddleware");

// si no esta logueado lo envia a loguearse
const authMiddleware = require("../middlewares/authMiddleware");

// para verificar si un usuario existe en la base, si no existe lo envia a not-found
const validUserMiddleware = require("../middlewares/validUserMiddleware");

/*Definimos un storage para las imagenes de perfil */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/usersProfiles");
  },
  filename: (req, file, cb) => {
    let profileImgName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, profileImgName);
  },
});
const uploadFile = multer({ storage });

const usersControllers = require("../controllers/usersControllers");

/*RUTAS */
/*Listado de todos los usuarios */
//router.get("/", authMiddleware, usersControllers.index);
//quito momentaneamente el middleware mientras hacemos transicion de database
router.get("/", usersControllers.index);


/*Formulario de Login*/
//router.get("/login", guestMiddleware, usersControllers.login);
router.get("/login", usersControllers.login);

/* procesa login*/
//router.post("/", loginValidations, usersControllers.processLogin);
router.post("/", usersControllers.processLogin);

/*Logout */
router.get("/logout", usersControllers.logout);


/*CRUD USERS */
/* CREATE - Formulario de registro */
router.get("/register", guestMiddleware, usersControllers.showRegister);

/*Guardar usuario nuevo */
router.post(
  "/register",
  uploadFile.single("profilePic"),
  basicRegisterValidations,
  usersControllers.register
);

/* READ - Formulario detalle de un usuario*/
/*router.get(
  "/:id",
  authMiddleware,
  validUserMiddleware,
  usersControllers.detail
);*/
router.get("/:id", usersControllers.detail);


/* UPDATE - Formulario de edicion de usuario */
/*router.get(
  "/edit/:id",
  authMiddleware,
  validUserMiddleware,
  usersControllers.edit
);*/
/*router.get(
  "/edit/:id",
  usersControllers.edit
);
/* Guardar edición de usuario */
//router.put("/:id", uploadFile.single("profilePic"), usersControllers.update);

/* DELETE - Borrar usuario */
//router.delete("/:id", usersControllers.delete);

module.exports = router;
