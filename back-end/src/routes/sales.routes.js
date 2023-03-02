const express = require('express');
const { registerNewSale, getSalesBySallerId } = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', registerNewSale);
route.get('/seller', getSalesBySallerId);

module.exports = route;