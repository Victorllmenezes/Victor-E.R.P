const Product = require("../models/Product");
const {
  sendErrorNotFound,
  sendOk,
  sendInternalServerError,
  sendCreated,
} = require("../response/response");
require("../response/response");

module.exports = {
  async saveProduct(req, res) {
    const { id, description, purchase_price, standard_profit_margin } =
      req.body;
    let product;
    if (id === 0) {
      try {
        product = await Product.create({
          description,
          purchase_price,
          standard_profit_margin,
        });
      } catch (error) {
        console.log(error);
        sendInternalServerError(res);
      }
      sendCreated(res.json(product));
    } else {
      product = await Product.findByPk(id);
      if (product) {
        await Product.update(
          {
            description,
            purchase_price,
            standard_profit_margin,
          },
          { where: { id } }
        );
        sendCreated(res, { status: 201, message: "Sucessfully updated!" });
      } else {
        sendErrorNotFound(res);
      }
    }
  },

  async getAProduct(req, res) {
    const { product_id } = req.params;
    let product;
    try {
      product = await Product.findByPk(product_id);
      !product ? sendErrorNotFound(res) : sendOk(res, product);
    } catch (error) {
      sendInternalServerError(res);
    }
  },

  async getAllProducts(req, res) {
    let products;
    try {
      products = await Product.findAll();
      !products ? sendErrorNotFound(res) : sendOk(res, products);
    } catch (error) {
      sendInternalServerError(res);
    }
  },
};
