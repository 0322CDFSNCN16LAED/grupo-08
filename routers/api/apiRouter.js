const express = require('express');
const router = express.Router();

const usersApiRouter = require('./usersApiRouter');
const apiUsersController = require('../../controllers/api/usersApiController')

// Ruta a usuarios
router.get('/users', apiUsersController.list);
router.get('/users/:id', apiUsersController.detail);

//Ruta a products

module.exports = router;