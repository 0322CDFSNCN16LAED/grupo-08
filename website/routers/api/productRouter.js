const express = require("express");
const productControllersApi = require("../../controllers/api/productControllersApi");
const router = express.Router();

// /api/product

router.get("/", productControllersApi.list);
//router.get("/category", productControllersApi.category);
router.get(
  "/lastProductRegistered",
  productControllersApi.lastProductRegistered
);
router.get("/category/:categoryId", productControllersApi.detailcateg);
router.get("/:id", productControllersApi.detailprod);

module.exports = router;
