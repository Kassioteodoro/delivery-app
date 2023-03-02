const express = require('express');
const { adminCreateUser } = require('../controllers/users.controller');

const route = express.Router();

route.post('/', adminCreateUser);

module.exports = route;