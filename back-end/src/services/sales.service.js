const { Sale, SaleProduct, sequelize } = require('../database/models');
const { findUserByName } = require('./users.service');
const { findProductByName } = require('./products.service');

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
      items.map(async ({ name, quantity }) => {
        const productId = await findProductByName(name);
        const saleId = sale.id;
        SaleProduct.create({ saleId, productId: productId.id, quantity });
      }), { transaction: t },
    );
    t.commit();
    // console.log(sale.dataValues.id);
    return sale.dataValues.id;
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

module.exports = {
  createNewSale,
  getSalesBySellerId,
};
