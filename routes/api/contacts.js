const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
} = require("../../controllers/contactsControllers");

const {
  isEmptyBody,
  validatedContactOnPut,
  validatedContactOnPost,
  isContactExist,
} = require("../../middlewares");
const { isValidId } = require("../../middlewares/isValidId");
const {
  validatedContactOnPatch,
} = require("../../middlewares/validateContacts");

const router = express.Router();

router
  .get("/", getContactsController)
  .post("/", validatedContactOnPost, addContactController);

router
  .get("/:contactId", isValidId, isContactExist, getContactByIdController)
  .delete("/:contactId", isValidId, isContactExist, deleteContactController)
  .put(
    "/:contactId",
    isValidId,
    isContactExist,
    isEmptyBody,
    validatedContactOnPut,
    putContactController
  );

router.patch(
  "/:contactId/favorite",
  isValidId,
  validatedContactOnPatch,
  updateStatusContactController
);

module.exports = router;
