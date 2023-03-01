const { Product } = require('../database/models');

const findAllProducts = async () => {
  const products = await Product.findAll();

  return { message: products };
};

const findProductByName = async (name) => Product.findOne({ where: { name }, raw: true });

module.exports = {
  findAllProducts,
  findProductByName,
};