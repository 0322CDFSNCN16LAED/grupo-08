const express = require("express");
const productControllersApi = require("../../controllers/api/productControllersApi");
const router = express.Router();

// /api/product

router.get("/", productControllersApi.list);
router.get("/:id", productControllersApi.detail);
router.get("/category", productControllersApi.category);

module.exports = router;