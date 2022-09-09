const express = require("express");
const usersApiController = require("../../controllers/api/usersApiController");

const router = express.Router();

router.get("/", usersApiController.list);
// inestable por el momento ----------->
// router.get("/lastUserRegistered", usersApiController.lastUserRegistered);
router.get("/:id", usersApiController.detail);

module.exports = router;
