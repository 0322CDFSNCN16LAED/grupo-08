'use strict';
const { DataTypes } = require("sequelize");


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', { 
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    }
})
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('UserRoles');
     
  }
};