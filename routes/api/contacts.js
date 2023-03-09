const express = require("express");
const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).send(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = +req.params.contactId;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).send(contact);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
