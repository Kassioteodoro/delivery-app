const express = require('express');
const { registerNewSale, getSales, update } = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', registerNewSale);
route.get('/seller', getSales);
route.put('/status', update);

module.exports = route;