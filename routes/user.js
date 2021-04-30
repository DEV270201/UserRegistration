const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/register",userController.Register);

module.exports = router;