const { verifyToken } = require("../auth/jwtFunctions");
const { createNewSale } = require("../services/sales.service");

const registerNewSale = async (req, res) => {
  try {
    const user = verifyToken(req.get("Authorization"));
    const { items, totalPrice, seller, deliveryAddress, deliveryNumber } =
      req.body;
    const saleId = await createNewSale(
      { items, totalPrice, seller, deliveryAddress, deliveryNumber },
      user.data.id
    );
    if (saleId) return res.status(201).json(saleId);
    return res.sendStatus(500);
  } catch (error) {
    return res.status(401).json({ error });
  }
};

const getSalesBySallerId = async (req, res) => {
  try {
    const user = verifyToken(req.get("Authorization"));
    const sales = await getSalesBySallerId(user.data.id);
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = {
  registerNewSale,
  getSalesBySallerId,
};
