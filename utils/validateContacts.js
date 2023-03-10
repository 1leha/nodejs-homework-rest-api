const Joi = require("joi");

const validatedContactOnPost = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Missing required name field!" });
  }

  next();
};

const validatedContactOnPut = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().alphanum(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Error in the field content!" });
  }

  next();
};

module.exports = { validatedContactOnPost, validatedContactOnPut };
