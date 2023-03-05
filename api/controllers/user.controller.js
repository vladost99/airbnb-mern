const userService = require("../services/user.service");

const register = async ({ body }, res, next) => {
  await userService.register(body);
  res.status(201);
};

const login = async ({ body }, res) => {
  const user = await userService.login(body);
  return res.json(user);
};

const profile = async ({ user }, res) => {
  const userData = await userService.profile(user._id);
  return res.json(userData);
};

module.exports = {
  register,
  login,
  profile,
};
