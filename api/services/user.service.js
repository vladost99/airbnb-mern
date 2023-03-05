const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const tokenService = require("./token.service");
const commonErrors = require("../exceptions/common.exceptions");

const formatUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const register = async ({ name, password, email }) => {
  const userFound = await findUserByEmail(email);

  if (userFound) {
    throw commonErrors.UserAlreadyExist();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new userModel({
    email,
    name,
    password: hashPassword,
  });

  await user.save();
};

const login = async ({ password, email }) => {
  const userFound = await findUserByEmail(email);

  if (!userFound) {
    throw commonErrors.UserNotFound();
  }

  const comparePassword = await bcrypt.compare(password, userFound.password);

  if (!comparePassword) {
    throw commonErrors.PasswordNotMatch();
  }

  const token = tokenService.generateToken(formatUser(userFound));

  return {
    ...formatUser(userFound),
    token,
  };
};

const profile = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      throw commonErrors.UserNotFound();
    }

    const token = tokenService.generateToken(formatUser(user));

    return {
      ...formatUser(user),
      token,
    };
  } catch (e) {
    throw commonErrors.BadRequest("Bad request");
  }
};

module.exports = {
  register,
  login,
  profile,
};
