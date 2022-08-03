'use strict';
const { v4 } = require("uuid");
const uuid = v4;

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      id: 1,
      name: 'Muebles'
     },{
      id: 2,
      name: 'Textiles'
    },{
      id: 3,
      name: 'Vajílla'
    },{
      id: 4,
      name: 'Accesorios'
    },{
      id: 5,
      name: 'Iluminación'
    },{
      id: 6,
      name: 'Otros'
    },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
