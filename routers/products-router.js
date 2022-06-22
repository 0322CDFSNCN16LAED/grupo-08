const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const productControllers = require("../controllers/productControllers");

const multerDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/products"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFile = multer({ storage: multerDiskStorage });

/* Listado de productos*/
router.get("/", productControllers.index);

/* Crear un producto*/
router.get("/create", productControllers.create);
router.post("/", uploadFile.single("image"), productControllers.store);

/* Ver detalle de un producto*/
router.get("/:id", productControllers.detail);

/* Editar un producto*/
router.get("/edit/:id", productControllers.edit);
router.put("/:id", productControllers.update);

/* Eliminar un producto*/
router.delete("/:id", productControllers.destroy);

module.exports = router;
