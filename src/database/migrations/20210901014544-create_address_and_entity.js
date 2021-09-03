'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entities', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.createTable('addresses', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      entity_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "entities", key:"id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      zipcode:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      street:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighborhood:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      number:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('entities');
  }
};
