const Joi = require("joi");
const { User } = require("../models/usersModel");
const { EmailInUseError, BadRequestError } = require("../utils/errors");

const validatedUserOnRegister = async (req, res, next) => {
  const { error, value } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
  }).validate(req.body);

  if (error) {
    const errorField = error.details[0].context.key;
    return next(new BadRequestError(`Missing required ${errorField} field!`));
  }

  const isUserExist = await User.findOne({ email: value.email });

  if (isUserExist) {
    return next(new EmailInUseError("Email in use"));
  }
  console.log("value :>> ", value);
  req.body = value;
  next();
};

const validatedUserOnLogin = async (req, res, next) => {
  const { error, value } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    const errorField = error.details[0].context.key;
    return next(new BadRequestError(`Missing required ${errorField} field!`));
  }

  req.body = value;
  next();
};

const validatedUsersSubscription = async (req, res, next) => {
  const { error, value } = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
  }).validate(req.body);

  if (error) {
    return next(
      new BadRequestError(
        `Subscription must be only "starter", "pro", "business"`
      )
    );
  }

  req.body = value;
  next();
};

module.exports = {
  validatedUserOnRegister,
  validatedUserOnLogin,
  validatedUsersSubscription,
};
