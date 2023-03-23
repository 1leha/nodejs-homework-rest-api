const { isContactExist } = require("./isContactExist");
const { isEmptyBody } = require("./isEmptyBody");
const {
  validatedContactOnPost,
  validatedContactOnPut,
} = require("../middlewares/validateContacts");

module.exports = {
  isContactExist,
  isEmptyBody,
  validatedContactOnPost,
  validatedContactOnPut,
};
