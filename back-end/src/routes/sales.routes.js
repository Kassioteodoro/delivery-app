const express = require('express');
const { registerNewSale, getSales } = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', registerNewSale);
route.get('/seller', getSales);

module.exports = route;