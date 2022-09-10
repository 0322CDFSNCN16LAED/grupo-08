const express = require("express");
const router = express.Router();

const usersApiRouter = require("./usersApiRouter");
const productRouter = require("./productRouter");

// Ruta a usuarios
router.use("/users", usersApiRouter);
router.use("/products", productRouter);
//Ruta a products

module.exports = router;


