const express = require("express") 
const router = express.Router();

const { userRegisterController, userLoginController } = require("../controllers/auth.controller");
const { registerValidation , loginValidation } = require("../middlewares/validation.js");

router.post("/register",registerValidation, userRegisterController);
router.post("/login", loginValidation, userLoginController);

module.exports = router;