const path = require("path");
const { readFile } = require("../utils");

const dbPath = path.join(__dirname, "../models/contacts.json");

exports.isContactExist = async (req, res, next) => {
  const contactId = +req.params.contactId;

  const contacts = JSON.parse(await readFile({ path: dbPath }));
  const [contact] = contacts.filter((contact) => +contact.id === contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};
