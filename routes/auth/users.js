const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
} = require("../../controllers/usersControllers");
const { authMiddlware } = require("../../middlewares/authMiddleware");

const {
  validatedUserOnRegister,
  validatedUserOnLogin,
} = require("../../middlewares/validateUser");

router.post("/users/register", validatedUserOnRegister, registerController);
router.post("/users/login", validatedUserOnLogin, loginController);
router.post("/users/logout", authMiddlware, logoutController);

module.exports = router;
