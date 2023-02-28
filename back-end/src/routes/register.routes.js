const express = require('express');
const registerMiddleware = require('../middlewares/register.middleware');
const userController = require('../controllers/users.controller');

const route = express.Router();

route.post('/', registerMiddleware, userController.createUser);

module.exports = route;