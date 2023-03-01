const { Product } = require('../database/models');

const findAllProducts = async () => {
  const products = await Product.findAll();

  return { message: products };
};

module.exports = {
  findAllProducts,
};