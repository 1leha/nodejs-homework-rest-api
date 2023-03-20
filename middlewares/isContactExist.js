const { Contacts } = require("../models/contactModel");

exports.isContactExist = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contacts.findOne({ _id: contactId });
    req.body = contact;
    next();
    if (!contact) {
      return next(res.status(404).json({ message: "Not found" }));
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
};
