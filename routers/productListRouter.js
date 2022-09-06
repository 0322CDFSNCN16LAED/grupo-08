const express = require("express");
const router = express.Router();
const productListController = require('../controllers/productListController')


router.get('/rooms', productListController.rooms);
router.get('/styles', productListController.styles);
router.get('/categories', productListController.categories);
router.get('/inSale', productListController.inSale);

module.exports = router;