const express = require('express');
const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');
const productsRoutes = require('./products.routes');
const salesRoutes = require('./sales.routes');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/register', registerRoutes);
routes.use('/products', productsRoutes);
routes.use('/sales', salesRoutes);

module.exports = routes;