const { Product } = require('../database/models');

const findAllProducts = async () => {
  const products = await Product.findAll();

  return { message: products };
};

const findProductByName = async (name) => Product.findOne({ where: { name }, raw: true });

const findProductById = async (id) => Product.findByPk(id);

module.exports = {
  findAllProducts,
  findProductByName,
  findProductById,
};