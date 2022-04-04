const { Sequelize } = require("sequelize");
const mySqlConfig = require("../configs/database");

const sequelize = new Sequelize({
  username: mySqlConfig.MYSQL_USERNAME,
  password: mySqlConfig.MYSQL_PASSWORD,
  database: mySqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: "mysql",
});

// Models
const Tag = require("../models/tag")(sequelize);
const Product = require("../models/product")(sequelize)
const Product_Tag = require("../models/product_tags")(sequelize)

// Assosiations
Tag.hasMany(Product_Tag, { foreignKey: "tag_id" })
Product_Tag.belongsTo(Tag, { foreignKey: "tag_id" })
Product.hasMany(Product_Tag, { foreignKey: "Product_id" })
Product_Tag.belongsTo(Product, { foreignKey: "Product_id" })

module.exports = {
  sequelize,
  Tag,
  Product,
  Product_Tag
};