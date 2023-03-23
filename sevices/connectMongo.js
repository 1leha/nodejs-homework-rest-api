const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = { dbConnection };
