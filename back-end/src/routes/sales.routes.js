const express = require('express');
const { registerNewSale } = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', registerNewSale);

module.exports = route;