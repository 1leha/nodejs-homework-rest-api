const { createId } = require("./createId");
const {
  validatedContactOnPost,
  validatedContactOnPut,
} = require("./validateContacts");
const { readFile, writeFile } = require("./fileOperations");

module.exports = {
  validatedContactOnPost,
  validatedContactOnPut,
  createId,
  readFile,
  writeFile,
};
