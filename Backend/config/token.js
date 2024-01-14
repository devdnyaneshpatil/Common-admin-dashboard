const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId,role) => {
  return jwt.sign({ userId,role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { generateToken, validateToken };
