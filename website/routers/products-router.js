const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const productControllers = require("../controllers/productControllers");
//Middlewares de roles de usuario
const sellerMiddleware = require("../middlewares/sellerMiddleware"); //VENDEDOR
const basicCreateValidationsProducts = require("../validation/productValidation");

/*para guardar los archivos y el nombre que quiero que se guarde */
const multerDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/products");
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

router.get("/create", sellerMiddleware, productControllers.create);
router.post(
  "/",
  sellerMiddleware,
  uploadFile.single("picture"),
  basicCreateValidationsProducts,
  productControllers.store
);

/* Buscar producto */
router.get("/search", productControllers.search);


router.get("/category/:name", productControllers.category);

/* Ver detalle de un producto*/
router.get("/:id", productControllers.detail);

/* Editar un producto*/
//sellerMiddleware
router.get("/edit/:id", sellerMiddleware, productControllers.edit);
router.put(
  "/:id",
  sellerMiddleware,
  uploadFile.single("picture"),
  basicCreateValidationsProducts,
  productControllers.update
);

/* Eliminar un producto*/
//sellerMiddleware
router.delete("/:id", sellerMiddleware, productControllers.destroy);

module.exports = router;

