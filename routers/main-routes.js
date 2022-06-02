const path = require('path')

const express = require('express')
const router = express.Router();

const mainControllers = require('../controllers/mainControllers')

router.get("/", mainControllers.home) 
router.get("/carritocompras", mainControllers.carritoCompras)
router.get("/catalogo", mainControllers.catalogo)
router.get("/ingresos", mainControllers.ingresos)
router.get("/login", mainControllers.login)
router.get("/ofertas", mainControllers.ofertas)
router.get("/pago", mainControllers.pago)
router.get("/productoLamp", mainControllers.productoLamp)
router.get("/producto-silla", mainControllers.productoSilla)
router.get("/producto", mainControllers.producto)
router.get("/register", mainControllers.register)
router.get("/ultimas-tendencias-livings", mainControllers.tendenciasLivings)

module.exports = router;