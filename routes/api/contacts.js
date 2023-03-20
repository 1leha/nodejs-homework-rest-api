const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
} = require("../../controllers/contactsControllers");

const {
  isEmptyBody,
  validatedContactOnPut,
  validatedContactOnPost,
} = require("../../middlewares");
const { isValidId } = require("../../middlewares/isValidId");

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

router.patch("/api/contacts/:contactId/favorite", () => {});

module.exports = router;
