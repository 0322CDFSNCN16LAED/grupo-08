'use strict';
const { v4 } = require("uuid");
const uuid = v4;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      id: uuid(),
      name: 'Muebles'
     },{
      id: uuid(),
      name: 'Textiles'
    },{
      id: uuid(),
      name: 'Vajilla'
    },{
      id: uuid(),
      name: 'Accesorios'
    },{
      id: uuid(),
      name: 'Iluminación'
    },{
      id: uuid(),
      name: 'Otros'
    },], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
