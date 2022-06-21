const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

/*Aca  los enrutadores*/
router.get("/login", usersControllers.login);
 
router.get("/register", usersControllers.register);
router.post("/register", usersControllers.register);

module.exports = router;
