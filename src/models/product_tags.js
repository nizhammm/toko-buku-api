const { DataTypes } = require("sequelize")

const Product_Tag = (sequelize) => {
    return sequelize.define("product_tag", {})
}

module.exports = Product_Tag