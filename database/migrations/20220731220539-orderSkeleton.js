'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', { 
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderDate:{
        allowNull: false,
        type: DataTypes.DATE,
      },
      orderTotal: {
      allowNull: false,
      type: DataTypes.DECIMAL
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
    
  }
};
