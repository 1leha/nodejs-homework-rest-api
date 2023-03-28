const { Contacts } = require("./contactModel");

const listContacts = async (ownerId, { favorite, limit, page }) => {
  // pagination options
  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;
  const skip = (paginationPage - 1) * paginationLimit;

  // query string
  const queryString = favorite
    ? { $and: [{ owner: ownerId }, { favorite }] }
    : { owner: ownerId };

  return await Contacts.find(queryString).skip(skip).limit(paginationLimit);
};

const getContactById = async (contactId) => {
  return await Contacts.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return await Contacts.findByIdAndDelete(contactId);
};

const addContact = async (body) => {
  return await Contacts.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
