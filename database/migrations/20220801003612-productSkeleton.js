'use strict';
const { DataTypes } = require("sequelize");


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    freeDelivery: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    measurements: {
        type: DataTypes.STRING
    },
    details: {
        type: DataTypes.STRING
    },
    extraInfo: {
        type: DataTypes.STRING
    },
    picture: {
        type: DataTypes.STRING
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
