const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const productControllers = require("../controllers/productControllers");

// Middlewares
const basicCreateValidationsProducts = require("../validation/productValidation");

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
router.get("/create", productControllers.create);
router.post("/create", uploadFile.single("picture"), basicCreateValidationsProducts, productControllers.processCreate);


router.post("/", uploadFile.single("picture"), productControllers.store);

/* Buscar producto */
router.get("/search", productControllers.search);

/* Ver detalle de un producto*/
router.get("/:id", productControllers.detail);

/* Editar un producto*/
router.get("/edit/:id", productControllers.edit);
router.put("/:id", uploadFile.single("picture"), productControllers.update);

/* Eliminar un producto*/
router.delete("/:id", productControllers.destroy);

module.exports = router;
