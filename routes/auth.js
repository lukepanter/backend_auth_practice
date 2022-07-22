const { Router } = require("express");
const router = Router();
const authController = require("../controller/auth/authController");
const middleware = require("../middleware/middleware");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/logout", authController.logout);

router.get("/profile", authController.profile);

module.exports = router;
