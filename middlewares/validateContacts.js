const Joi = require("joi");
const { Contacts } = require("../models/contactModel");

const validatedContactOnPost = async (req, res, next) => {
  const { error, value } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false),
  }).validate(req.body);

  if (error) {
    const errorField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `Missing required ${errorField} field!` });
  }

  const isUserExist = await Contacts.findOne({ name: value.name });

  if (isUserExist) {
    return res.status(400).json({ message: "User exist" });
  }

  req.body = value;
  next();
};

const validatedContactOnPut = (req, res, next) => {
  const { error, value } = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  }).validate(req.body);

  if (error) {
    console.log("error :>> ", error);
    return res.status(400).json({ message: "Error in the field content!" });
  }

  req.body = value;

  next();
};

const validatedContactOnPatch = (req, res, next) => {
  const { error, value } = Joi.object({
    favorite: Joi.boolean().required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  req.body = value;

  next();
};

module.exports = {
  validatedContactOnPost,
  validatedContactOnPut,
  validatedContactOnPatch,
};
