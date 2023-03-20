const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).send(contacts);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    res.status(200).json(contact);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addContactController = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    await removeContact(contactId);

    res.status(204).send();
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const putContactController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateStatusContactController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedContact = await updateStatusContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
};
