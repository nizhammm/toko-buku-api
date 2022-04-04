const { Product, Product_Tag } = require("../lib/sequelize");
const fileUploader = require("../lib/uploader");

const productControllers = {
  getAllProduct: async (req, res) => {
    try {
      const { _limit = 5, _page = 1 } = req.query;

      delete req.query._limit;
      delete req.query._page;

      const getAllProducts = await Product.findAndCountAll({
        where: {
          ...req.query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        include: {
          model: Product_Tag,
        },
      });

      return res.status(200).json({
        message: "All products",
        result: getAllProducts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  createNewProduct: async (req, res) => {
    try {
      const { book_name, product_id, stock, tags } = req.body;

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = `product-cover-img`;
      const { filename } = req.file;

      const [newProduct, created] = await Product.findOrCreate({
        where: { book_name },
        defaults: {
          cover: `${uploadFileDomain}/${filePath}/${filename}`,
          stock,
          product_id,
        },
      });

      if (!created) {
        return res.status(400).json({
          message: "Products already created",
        });
      }

      const newProductTag = tags.split(",");

      await Product_Tag.bulkCreate(
        newProductTag.map((val) => {
          return { product_id: newProduct.dataValues.id, tag_id: val };
        })
      );

      return res.status(201).json({
        message: "Product created",
        result: newProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  editProduct: async (req, res) => {
    try {
      const {} = req.params;

      const updateProduct = await Product.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "Product edited",
        result: updateProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteProduct = await Product.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "Product deleted",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = productControllers;