const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
  return sequelize.define("Product", {
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Product;