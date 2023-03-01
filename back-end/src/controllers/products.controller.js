const productsService = require('../services/products.service');

const findAllProducts = async (_req, res) => {
  const { message } = await productsService.findAllProducts();
  return res.status(200).json(message);
};

module.exports = {
  findAllProducts,
};