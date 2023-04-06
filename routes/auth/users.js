const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUsersSubscriptionController,
  updateUserAvatarController,
  verifyTokenController,
} = require("../../controllers/usersControllers");
const { authMiddlware } = require("../../middlewares/authMiddleware");
const { uploadAvatar } = require("../../middlewares/uploadAvatar");

const {
  validatedUserOnRegister,
  validatedUserOnLogin,
  validatedUsersSubscription,
} = require("../../middlewares/validateUser");

router.post("/users/register", validatedUserOnRegister, registerController);
router.post("/users/login", validatedUserOnLogin, loginController);
router.post("/users/logout", authMiddlware, logoutController);
router.get("/users/current", authMiddlware, getCurrentUserController);
router.patch(
  "/users",
  authMiddlware,
  validatedUsersSubscription,
  updateUsersSubscriptionController
);
router.patch(
  "/users/avatars",
  authMiddlware,
  uploadAvatar,
  updateUserAvatarController
);

// verify mail
router.get("/users/verify/:verificationToken", verifyTokenController);

module.exports = router;
