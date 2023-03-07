const { verifyToken } = require('../auth/jwtFunctions');
const { createNewSale, getSalesBySellerId, updateStatus } = require('../services/sales.service');

const registerNewSale = async (req, res) => {
  try {
    const user = verifyToken(req.get('Authorization'));
    const { items, totalPrice, seller, deliveryAddress, deliveryNumber } = req.body;
    const saleId = await createNewSale(
      { items, totalPrice, seller, deliveryAddress, deliveryNumber },
      user.data.name,
    );
    if (saleId) return res.status(201).json(saleId);
    return res.sendStatus(500);
  } catch (error) {
    return res.status(401).json({ error });
  }
};

const getSales = async (req, res) => {
  try {
    const user = verifyToken(req.get('Authorization'));
    const sales = await getSalesBySellerId(user.data.id);
    return res.status(200).json(sales.message);
  } catch (error) {
    return res.status(401).json(error);
  }
};

const sellerUpdate = async (req, res) => {
  try {
    const user = verifyToken(req.get('Authorization'));
    if (user.data.role !== 'seller') {
      return res.status(401)
      .json({ message: 'Only sellers can update status' });
    } 
    const { saleId, status } = req.body;
    if (status !== 'Entregue') {
      const sale = await updateStatus(saleId, status);
      return res.status(200).json(sale);
    }
    res.status(401).json({ message: 'Seller cannot change status to "Entregue"' });
  } catch (error) {
    return res.status(401).json(error);
  }
};

const customerUpdate = async (req, res) => {
  try {
    const user = verifyToken(req.get('Authorization'));
    if (user.data.role !== 'customer') {
      return res.status(401)
      .json({ message: 'Only customers can update status to "Entregue"' });
    }
    const { saleId, status } = req.body;
    if (status === 'Entregue') {
      const sale = await updateStatus(saleId, status);
      return res.status(200).json(sale);
    }
    res.status(401).json({ message: 'Customer cannot change status to anything but "Entregue"' });
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = {
  registerNewSale,
  getSales,
  sellerUpdate,
  customerUpdate,
};
