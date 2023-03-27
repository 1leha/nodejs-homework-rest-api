const { User } = require("../models/usersModel");
const { decodeToken } = require("../sevices/token");
const { NotAuthorisedError } = require("../utils/errors");

exports.authMiddlware = async (req, res, next) => {
  const isToken = req.headers?.authorization;

  if (!isToken) {
    return next(new NotAuthorisedError("Not authorized"));
  }

  const [tokenType, token] = req.headers.authorization.split(" ");

  if (tokenType !== "Bearer") {
    next(new NotAuthorisedError("Not authorized"));
  }

  try {
    const user = decodeToken(token);

    if (!user) {
      next(new NotAuthorisedError("Not authorized"));
    }

    const logginedUser = await User.findById(user.id);

    if (token !== logginedUser.token) {
      next(new NotAuthorisedError("Not authorized"));
    }
    // req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorisedError("Not authorized"));
  }
};
