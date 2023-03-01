const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async (name, email, password, role = 'customer') => {
  const user = await User.findOne({ where: { email } });
  if (user) return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
  const newUser = await User.create({ name, email, password, role });

  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);

  return { type: null, message: { token } };
};

const findAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { message: users };
};

const findUserByName = async (name) => User.findOne({ where: { name }, raw: true });

module.exports = {
  findAllUser,
  createUser,
  findUserByName,
};