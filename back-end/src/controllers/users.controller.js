const md5 = require('md5');
const userService = require('../services/users.service');

const findAllUsers = async (_req, res) => {
  const { message } = await userService.findAllUser();
  return res.status(200).json(message);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { type, message } = await userService.createUser(name, email, md5(password));
  if (type) return res.status(409).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  findAllUsers,
  createUser,
};