const { Types } = require("mongoose");

exports.isValidId = async (req, res, next) => {
  const contactId = req.params.contactId;

  const isValidId = Types.ObjectId.isValid(contactId);

  if (!isValidId) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};
