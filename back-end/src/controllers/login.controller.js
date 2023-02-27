const loginService = require('../services/login.service');
const md5 = require('md5');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginService.login(email, md5(password));
  if (token.type) return res.status(404).json({ message: token.message });
  return res.status(200).json(token);
};

module.exports = {
  login,
};