const { Router } = require("express");
const router = Router();
const authController = require("../controller/auth/authController");

router.get("/login", authController.login);

router.get("/register", authController.register);

module.exports = router;
