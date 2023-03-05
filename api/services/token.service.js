const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const validate = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (e) {
    return null;
  }
};

module.exports = { generateToken, validate };
