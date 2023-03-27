const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const { asynWrapper } = require("../utils/asyncWrapper");

const getContactsController = asynWrapper(async (req, res, next) => {
  const ownerId = req.user.id;

  const contacts = await listContacts(ownerId);
  res.status(200).send(contacts);
});

const getContactByIdController = asynWrapper(async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  res.status(200).json(contact);
});

const addContactController = asynWrapper(async (req, res, next) => {
  const newContactData = {
    ...req.body,
    owner: req.user.id,
  };

  const newContact = await addContact(newContactData);
  res.status(201).json(newContact);
});

const deleteContactController = asynWrapper(async (req, res, next) => {
  const contactId = req.params.contactId;

  await removeContact(contactId);

  res.status(204).send();
});

const putContactController = asynWrapper(async (req, res, next) => {
  const contactId = req.params.contactId;
  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json(updatedContact);
});

const updateStatusContactController = asynWrapper(async (req, res, next) => {
  const contactId = req.params.contactId;
  const updatedContact = await updateStatusContact(contactId, req.body);
  res.status(200).json(updatedContact);
});

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
};
