const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyToken,
  sendToken,
} = require("../models/users");

require("dotenv").config();

const ImagesAPI = require("../sevices/imageUpload");
const { asynWrapper } = require("../utils/asyncWrapper");
const { NotFound, BadRequestError } = require("../utils/errors");
const MailAPI = require("../utils/MailAPI");

const registerController = asynWrapper(async (req, res) => {
  const {
    email,
    password,
    subscription,
    avatarURL,
    verificationToken,
    verify,
  } = req.body;

  const newUser = await registerUser(
    email,
    password,
    subscription,
    avatarURL,
    verificationToken,
    verify
  );

  await new MailAPI(newUser).sendVerifyToken();

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

const loginController = asynWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  res.status(200).json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
});

const logoutController = asynWrapper(async (req, res) => {
  const id = req.user.id;

  await logoutUser(id);

  res.status(204).end();
});

const getCurrentUserController = asynWrapper(async (req, res) => {
  const { id } = req.user;

  const { email, subscription } = await getCurrentUser(id);

  res.status(200).json({
    email,
    subscription,
  });
});

const updateUsersSubscriptionController = asynWrapper(async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await updateSubscription(id, subscription);

  res.status(200).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
});

const updateUserAvatarController = asynWrapper(async (req, res) => {
  const { originalname } = req.file;
  const { id } = req.user;

  // save avatar from temp file. Return new avatar file name
  const avatar = await ImagesAPI.saveAvatar(id, originalname);

  const newAvatarURL = `/${process.env.AVATARS_PATH}/${avatar} `;

  const updatedUser = await updateAvatar(id, newAvatarURL);

  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
});

const verifyTokenController = asynWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const verificationResult = await verifyToken(verificationToken);

  if (!verificationResult) {
    throw new NotFound("User not found");
  }

  res.status(200).json({
    message: "Verification successful",
  });
});

const sendVerificationTokenController = asynWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await sendToken(email);

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    throw new BadRequestError("Verification has already been passed");
  }

  await new MailAPI(user).sendVerifyToken();

  res.status(200).json({
    message: "Verification email sent",
  });
});

module.exports = {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUsersSubscriptionController,
  updateUserAvatarController,
  verifyTokenController,
  sendVerificationTokenController,
};
