const md5 = require('md5');
const userService = require('../services/users.service');
const { verifyToken } = require('../auth/jwtFunctions');

const findAllUsers = async (_req, res) => {
  const { message } = await userService.findAllUser();
  return res.status(200).json(message);
};

const getSellers = async (_req, res) => {
  const { message } = await userService.findSellers();
  return res.status(200).json(message);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { type, message } = await userService.createUser(name, email, md5(password));
  if (type) return res.status(409).json({ message });
  return res.status(201).json(message);
};

const adminCreateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const admin = verifyToken(req.get('Authorization'));
    if (admin.data.role !== 'administrator') {
      return res.status(401)
        .send({ message: 'Only admins can register users from admin endpoint' });
    }
    const { type, message } = await userService.createUser(name, email, md5(password), role);
    if (type) return res.status(409).json({ message });
    return res.status(201).json(message);
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = {
  findAllUsers,
  createUser,
  adminCreateUser,
  getSellers,
};