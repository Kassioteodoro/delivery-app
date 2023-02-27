module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false, underscored: true, tableName: 'sales_products' });
  SaleProduct.associate = ({ Sale, Product }) => {
    Sale.belongsToMany(Product, {
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
    Product.belongsToMany(Sale, {
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
  }
  return SaleProduct;
}