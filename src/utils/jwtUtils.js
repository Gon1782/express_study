const jwt = require("jsonwebtoken");
const { PASSWORD } = process.env;

const JWT_SECRET = PASSWORD;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
  generateToken,
};
