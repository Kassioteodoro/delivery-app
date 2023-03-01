module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL(9, 2),
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, { timestamps: false, underscored: true });
  Sale.associate = ({ User }) => {
    Sale.belongsTo(User, { foreignKey: 'userId' });
    Sale.belongsTo(User, { foreignKey: 'sellerId' });
  }
  return Sale;
}