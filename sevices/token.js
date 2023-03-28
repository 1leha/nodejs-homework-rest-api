const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const decodeToken = (token) => jwt.decode(token, process.env.JWT_SECRET);

module.exports = { signToken, decodeToken };
