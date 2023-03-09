const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    return await fs.readFile(dbPath, "utf8");
  } catch (error) {
    console.log(
      `Can't read the file by path ${dbPath}! ERROR message: ${error}`
    );
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(dbPath, "utf8"));
    const [contact] = contacts.filter((contact) => +contact.id === contactId);

    return contact;
  } catch (error) {
    console.log(
      `Can't read the file by path ${dbPath}! ERROR message: ${error}`
    );
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
