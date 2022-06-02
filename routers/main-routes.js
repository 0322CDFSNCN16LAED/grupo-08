const path = require('path')

const express = require('express')
const router = express.Router();

const mainControllers = require('../controllers/mainControllers');
const usersControllers = require('../controllers/usersControllers');
const productControllers = require('../controllers/productControllers');


router.get("/", mainControllers.home);
router.get("/catalogo", mainControllers.catalogo);
router.get("/catalogo", mainControllers.administracionProductos);

router.get("/login", usersControllers.login);
router.get("/register", usersControllers.register);
router.get("/carritocompras", usersControllers.carritoCompras);
router.get("/pago", usersControllers.pago);

router.get("/producto-lamp", productControllers.productoLamp);
router.get("/producto-silla", productControllers.productoSilla);
router.get("/ingresos", productControllers.ingresos);
router.get("/ofertas", productControllers.ofertas);
router.get("/producto-biblioteca", productControllers.producto);
router.get("/ultimas-tendencias-livings", productControllers.tendenciasLivings);

module.exports = router;