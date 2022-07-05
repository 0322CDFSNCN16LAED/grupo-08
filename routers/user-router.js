const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

/*Requerimos Multer para que el register acepte imagenes de perfil */
// Middlewares
const basicRegisterValidations = require("../validation/userValidations");
const loginValidations = require("../validation/loginValidation");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
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
router.get("/", authMiddleware, usersControllers.index);

/*Formulario de Login*/
router.get("/login", guestMiddleware, usersControllers.login);
/* procesa login*/
router.post("/", loginValidations, usersControllers.processLogin);

/*Formulario de registro */
router.get("/register", guestMiddleware, usersControllers.showRegister);
/*Guardar usuario nuevo */
router.post(
  "/register",
  uploadFile.single("profile"),
  basicRegisterValidations,
  usersControllers.register
);

/* Formulario detalle de un usuario */
router.get(
  "/:id",
  authMiddleware,
  validUserMiddleware,
  usersControllers.detail
);

/* Formulario de edicion de usuario */
router.get(
  "/edit/:id",
  authMiddleware,
  validUserMiddleware,
  usersControllers.edit
);
/* Guardar edición de usuario */
router.put("/:id", usersControllers.update);

/* Borrar usuario */
router.delete("/:id", usersControllers.delete);

module.exports = router;
