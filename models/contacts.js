const { Contacts } = require("./contactModel");

const listContacts = async () => {
  return await Contacts.find();
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
  console.log("updateContact contactId :>> ", contactId);
  console.log("updateContact body :>> ", body);

  return await Contacts.updateOne({ contactId, ...body });

  // const contacts = JSON.parse(await readFile({ path: dbPath }));
  // const { name, email, phone } = body;
  // contacts.forEach((contact) => {
  //   if (+contact.id === contactId) {
  //     if (name) {
  //       contact.name = name;
  //     }
  //     if (email) {
  //       contact.email = email;
  //     }
  //     if (phone) {
  //       contact.phone = phone;
  //     }
  //   }
  //   return contact;
  // });
  // const updatedContact = contacts.find((contact) => +contact.id === contactId);
  // await writeFile({ path: dbPath, data: contacts });
  // return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
