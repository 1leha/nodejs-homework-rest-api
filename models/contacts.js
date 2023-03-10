const path = require("path");

const { createId, readFile, writeFile } = require("../utils");

const dbPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  return await readFile({ path: dbPath });
};

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await readFile({ path: dbPath }));

  const [contact] = contacts.filter((contact) => +contact.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await readFile({ path: dbPath }));

  const actualContacts = contacts.filter(
    (contact) => +contact.id !== contactId
  );

  await writeFile({ path: dbPath, data: actualContacts });
};

const addContact = async (body) => {
  const contacts = JSON.parse(await readFile({ path: dbPath }));

  const id = String(createId(contacts));
  const newContact = { id, ...body };

  contacts.push(newContact);

  await writeFile({ path: dbPath, data: contacts });

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await readFile({ path: dbPath }));

  const { name, email, phone } = body;
  contacts.forEach((contact) => {
    if (+contact.id === contactId) {
      if (name) {
        contact.name = name;
      }

      if (email) {
        contact.email = email;
      }

      if (phone) {
        contact.phone = phone;
      }
    }
    return contact;
  });

  const updatedContact = contacts.find((contact) => +contact.id === contactId);

  await writeFile({ path: dbPath, data: contacts });

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
