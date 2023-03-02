const express = require('express');
const { registerNewSale, getSales, sellerUpdate, customerUpdate } = require('../controllers/sales.controller');

const route = express.Router();

route.post('/', registerNewSale);
route.get('/seller', getSales);
route.put('/status/seller', sellerUpdate);
route.put('/status/customer', customerUpdate);

module.exports = route;