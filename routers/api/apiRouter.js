const express = require("express");
const router = express.Router();

const usersApiRouter = require("./usersApiRouter");

// Ruta a usuarios
router.use("/users", usersApiRouter);

//Ruta a products

module.exports = router;
