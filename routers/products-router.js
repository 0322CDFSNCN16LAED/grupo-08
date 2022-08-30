const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//Middlewares de roles de usuario
const sellerMiddleware = require('../middlewares/sellerMiddleware'); //VENDEDOR

const productControllers = require("../controllers/productControllers");

/*para guardar los archivos y el nombre que quiero que se guarde */
const multerDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  filename: function (req, file, cb) {
    const imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const uploadFile = multer({ storage: multerDiskStorage });

/* Listado de productos*/
router.get("/", productControllers.index);

/* Crear un producto*/
sellerMiddleware
router.get("/create", sellerMiddleware, productControllers.create);
router.post("/", uploadFile.single("picture"),sellerMiddleware, productControllers.store);

/* Buscar producto */
router.get("/search", productControllers.search);

/* Ver detalle de un producto*/
router.get("/:id", productControllers.detail);

/* Editar un producto*/
//sellerMiddleware
router.get("/edit/:id", sellerMiddleware, productControllers.edit);
router.put("/:id", uploadFile.single("picture"), sellerMiddleware, productControllers.update);

/* Eliminar un producto*/
//sellerMiddleware
router.delete("/:id", sellerMiddleware, productControllers.destroy);

module.exports = router;
