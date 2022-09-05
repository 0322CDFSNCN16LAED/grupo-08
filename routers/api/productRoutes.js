const express = require("express");
const producControllersApi = require("../../controllers/api/producControllersApi");
const router = express.Router();

// /api/product

router.get("/", producControllersApi.list);
router.get("/id", producControllersApi.detail);

module.exports = router;