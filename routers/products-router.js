const express = require("express");
const router = express.Router();

const productControllers = require("../controllers/productControllers");
/* ver todos los productos*/
router.get("/", productControllers.index);
/* ver un producto*/
router.get("/:id", productControllers.detail);

/* para crear un producto*/
router.get("/create", productControllers.create);
router.post("/", productControllers.store);

/* editar un producto*/
router.get("/edit/:id", productControllers.edit);
router.put("/:id", productControllers.update);

/* eliminar un producto*/
router.delete("/delete/:id", productControllers.destroy);

/* estos se convierten en detail
router.get("/administracion-productos",mainControllers.administracionProductos
);
router.get("/producto-lamp", productControllers.productoLamp);
router.get("/producto-silla", productControllers.productoSilla);
router.get("/producto-biblioteca", productControllers.productoBiblioteca);
router.get("/ingresos", productControllers.ingresos);
router.get("/ofertas", productControllers.ofertas);
router.get("/ultimas-tendencias-livings", productControllers.tendenciasLivings);
*/
module.exports = router;
