const { Contacts } = require("../models/contactModel");

exports.isContactExist = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
};
