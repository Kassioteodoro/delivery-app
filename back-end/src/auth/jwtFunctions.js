const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { createToken, verifyToken };