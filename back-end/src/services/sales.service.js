const { Sale, SaleProduct, Product, sequelize } = require('../database/models');
const { findUserByName } = require('./users.service');

const saveSaleToDb = async (userId, sale, t) => {
  const { seller, totalPrice, deliveryAddress, deliveryNumber } = sale;
  const sellerObj = await findUserByName(seller);
  return Sale.create(
    {
      userId,
      sellerId: sellerObj.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: Date(),
      status: 'Pendente',
    },
    { transaction: t },
  );
};

const createNewSale = async (checkout, userId) => {
  const { items } = checkout;
  const t = await sequelize.transaction();
  try {
    const sale = await saveSaleToDb(userId, checkout, t);
    await Promise.all(
      items.map(async ({ id, quantity }) => {
        const saleId = sale.id;
        SaleProduct.create({ saleId, productId: id, quantity });
      }), { transaction: t },
    );
    t.commit();
    return sale.dataValues;
  } catch (error) {
    console.error(error);
    t.rollback();
  }
};

const getSalesBySellerId = async (sellerId) => {
  const sales = await Sale.findAll({
    where: { sellerId },
  });
  return { message: sales };
};

const getSalesByCustomerId = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
  });
  return { message: sales };
};

const getSaleBySaleId = async (saleId) => {
  const sales = await Sale.findOne({
    where: { id: saleId },
  });
  return { message: sales };
};

const updateStatus = async (saleId, status) => {
  await Sale.update({ status }, { where: { id: saleId } });
  return { message: 'Status has been updated successfully' };
};

const getSalesProductsBySaleId = async (saleId) => {
  const [salesProducts] = await sequelize.query(`SELECT s.id, p.name, sp.quantity, p.price
  FROM products p INNER JOIN sales_products sp
  ON p.id = sp.product_id INNER JOIN sales s
  ON sp.sale_id = s.id
  WHERE quantity > 0 AND s.id = :saleId`, { replacements: { saleId } })
  return { message: salesProducts };
};

module.exports = {
  createNewSale,
  getSalesBySellerId,
  updateStatus,
  getSalesByCustomerId,
  getSaleBySaleId,
  getSalesProductsBySaleId,
};
