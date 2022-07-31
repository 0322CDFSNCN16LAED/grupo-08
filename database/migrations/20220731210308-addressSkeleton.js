'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Address', { 
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      zipcode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    });        
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Address');
    
  }
};
