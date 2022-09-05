const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");

router.use("/product", productRoutes);

module.exports = router;