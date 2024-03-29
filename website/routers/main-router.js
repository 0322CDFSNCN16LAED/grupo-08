//const path = require("path");
const express = require("express");

const productsRouter = require("./products-router");
const userRouter = require("./user-router");
const apiRouter = require('./api/apiRouter')
const mainControllers = require("../controllers/mainControllers");

const router = express.Router();

/* los del sitio en general*/
router.get("/", mainControllers.index);
router.get("/catalogo", mainControllers.catalogo);
router.get("/carritocompras", mainControllers.carritoCompras);
router.get("/pago", mainControllers.pago);

/* los routers para gestion de users y products */
router.use("/products", productsRouter);
router.use("/users", userRouter);

// API
router.use('/api', apiRouter);

module.exports = router;
