const { Model, DataTypes } = require('sequelize');

class Entity extends Model {
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
    },{
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Address, { foreignKey: "entity_id", as: "addresses" })
  }

}
module.exports = Entity;