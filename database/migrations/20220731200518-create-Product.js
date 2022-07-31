'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Product', { 
    
      id: {
          allowNull: false,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING
      },
      price: {
          allowNull: false,
          type: DataTypes.DECIMAL
      },
      freeDelivery: {
          allowNull: false,
          type: DataTypes.INTERGER
      },
      description: {
          type: DataTypes.STRING
      },
      measurements: {
          allowNull: false,
          type: DataTypes.STRING
      },
      details: {
          allowNull: false,
          type: DataTypes.STRING
      },
      extraInfo: {
          type: DataTypes.STRING
      },
      picture: {
          allowNull: false,
          type: DataTypes.STRING
      }
  })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
