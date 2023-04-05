const bcrypt = require("bcrypt");
const { signToken } = require("../sevices/token");

const { NotAuthorisedError } = require("../utils/errors");
const { User } = require("./usersModel");

const registerUser = async (email, password, subscription, avatarURL) => {
  const newUser = new User({
    email,
    password,
    subscription,
    avatarURL,
  });

  return await newUser.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorisedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorisedError("Email or password is wrong");
  }

  const token = signToken(user._id);

  return await User.findByIdAndUpdate(
    { _id: user._id },
    { token },
    { new: true }
  );
};

const logoutUser = async (id) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { token: null },
    { new: true }
  );
};

const getCurrentUser = async (id) => {
  return await User.findById({ _id: id });
};

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, subscription, { new: true });
};

const updateAvatar = async (id, avatarURL) => {
  console.log("id :>> ", id);
  return await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
