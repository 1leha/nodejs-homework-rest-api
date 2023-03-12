const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
} = require("../../controllers/contactsControllers");

const {
  validatedContactOnPost,
  validatedContactOnPut,
} = require("../../utils");
const { isContactExist, isEmptyBody } = require("../../middlewares");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", isContactExist, getContactByIdController);

router.post("/", validatedContactOnPost, addContactController);

router.delete("/:contactId", isContactExist, deleteContactController);

router.put(
  "/:contactId",
  isContactExist,
  isEmptyBody,
  validatedContactOnPut,
  putContactController
);

module.exports = router;
