const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        purchase_price: DataTypes.NUMBER,
        standard_profit_margin: DataTypes.NUMBER,
      },
      {
        sequelize,
      }
    );
  }
}
module.exports = Product;
