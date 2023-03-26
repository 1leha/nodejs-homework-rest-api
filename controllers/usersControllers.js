const { registerUser, loginUser, logoutUser } = require("../models/users");
const { asynWrapper } = require("../utils/asyncWrapper");

const registerController = asynWrapper(async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const newUser = await registerUser(email, password, subscription);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

const loginController = asynWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);
  res.status(200).json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
});

const logoutController = asynWrapper(async (req, res, next) => {
  const id = req.user.id;

  await logoutUser(id);

  res.status(204).end();
});

module.exports = { registerController, loginController, logoutController };
