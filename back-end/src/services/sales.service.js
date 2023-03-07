const { Sale, SaleProduct, sequelize } = require('../database/models');
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

const createNewSale = async (checkout, user) => {
  const { items } = checkout;
  const t = await sequelize.transaction();
  try {
    const userObj = await findUserByName(user);
    const sale = await saveSaleToDb(userObj.id, checkout, t);
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

const updateStatus = async (saleId, status) => {
    await Sale.update({ status }, { where: { id: saleId } });
    return { message: 'Status has been updated successfully' };
};

module.exports = {
  createNewSale,
  getSalesBySellerId,
  updateStatus,
};
