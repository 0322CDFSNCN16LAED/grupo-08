'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      { id: {
          allowNull: false,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            unique: true,
            type: DataTypes.STRING
        },
        phoneNumber: {
          type: DataTypes.INTEGER
        },
        profilePic: {
          type: DataTypes.STRING
        },
       });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    
  }
};
