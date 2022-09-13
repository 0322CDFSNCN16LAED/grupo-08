const express = require("express");
const router = express.Router();
const usersApiController = require("../../controllers/api/usersApiController");

router.get("/", usersApiController.list);
// router.get("/lastUserRegistered", usersApiController.lastUserRegistered);
// inestable por el momento ----------->
router.get("/lastUserRegistered", usersApiController.lastUserRegistered);
router.get("/:id", usersApiController.detail);

module.exports = router;
