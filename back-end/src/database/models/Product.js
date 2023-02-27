module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(4, 2)
    },
    urlImage: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, { timestamps: false, underscored: true });
  return Product;
}