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
  .get("/:contactId", isValidId, getContactByIdController)
  .delete("/:contactId", isValidId, deleteContactController)
  .put(
    "/:contactId",
    isValidId,
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
