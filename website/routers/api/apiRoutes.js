// esta carpeta depsues unirla con la de gaspar

const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");

router.use("/products", productRoutes);

module.exports = router;