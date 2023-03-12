const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = JSON.parse(await listContacts());
  res.status(200).send(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const contactId = +req.params.contactId;
  const contact = await getContactById(contactId);

  res.status(200).send(contact);
};

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContactController = async (req, res, next) => {
  const contactId = +req.params.contactId;
  await removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
};

const putContactController = async (req, res, next) => {
  const contactId = +req.params.contactId;
  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
};
