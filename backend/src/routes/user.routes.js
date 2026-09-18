const express = require("express") 
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {updateUserController} = require("../controllers/user.controller");
router.patch("/update/:id",authMiddleware,updateUserController);


module.exports = router;