const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize){
    super.init({
      zipcode: DataTypes.STRING,
      street: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      number: DataTypes.STRING,
    },{
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.Entity, { foreignKey: "entity_id", as: "owner"})
  }

}
module.exports = Address;