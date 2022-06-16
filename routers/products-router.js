const express = require("express");
const router = express.Router();

const productControllers = require("../controllers/productControllers");
/* listado de productos*/
router.get("/", productControllers.index);

/* para crear un producto*/
router.get("/create", productControllers.create);

/* ver detalle de un producto*/
router.get("/:id", productControllers.detail);

// accion de creación del producto
router.post("/", productControllers.store);

/* formulario para editar un producto*/
router.get("/edit/:id", productControllers.edit);

/* accion de edición del producto*/
router.put("/:id", productControllers.update);

/* eliminar un producto*/
router.delete("/:id", productControllers.destroy);

module.exports = router;
