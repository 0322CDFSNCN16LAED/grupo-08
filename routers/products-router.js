const express = require("express");
const router = express.Router();

const productControllers = require("../controllers/productControllers");

/* Listado de productos*/
router.get("/", productControllers.index);

/* Crear un producto*/
router.get("/create", productControllers.create);
router.post("/", productControllers.store);

/* Ver detalle de un producto*/
router.get("/:id", productControllers.detail);

/* Editar un producto*/
router.get("/edit/:id", productControllers.edit);
router.put("/:id", productControllers.update);

/* Eliminar un producto*/
router.delete("/:id", productControllers.destroy);

module.exports = router;
    