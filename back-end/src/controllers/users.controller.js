const userService = require('../services/users.service');

const findAllUsers = async (_req, res) => {
  const { message } = await userService.findAllUser();
  return res.status(200).json(message);
};

module.exports = {
  findAllUsers,
};