const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
} = require("../models/users");
const ImagesAPI = require("../sevices/imageUpload");
const { asynWrapper } = require("../utils/asyncWrapper");

const registerController = asynWrapper(async (req, res) => {
  const { email, password, subscription, avatarURL } = req.body;

  const newUser = await registerUser(email, password, subscription, avatarURL);

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

module.exports = {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUsersSubscriptionController,
  updateUserAvatarController,
};
