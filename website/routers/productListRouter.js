const express = require("express");
const router = express.Router();
const productListController = require('../controllers/productListController')


router.get('/inSale', productListController.inSale);
// router.get('/rooms/:id', productListController.rooms);
router.get('/styles/:id', productListController.styles);
router.get('/categories/:id', productListController.categories);

module.exports = router;