const express = require('express');
const { 
  registerNewSale, getCustomerSales, sellerUpdate, customerUpdate, getSale, getOrderDetails,
  getSales,
} = require('../controllers/sales.controller');
const { getSellers } = require('../controllers/users.controller');

const route = express.Router();

route.post('/', registerNewSale);
route.get('/all/:id', getSale);
route.get('/', getSellers);
route.get('/customer', getCustomerSales);
route.get('/seller', getSales);
route.get('/orders/:id', getOrderDetails);
route.put('/status/seller', sellerUpdate);
route.put('/status/customer', customerUpdate);

module.exports = route;