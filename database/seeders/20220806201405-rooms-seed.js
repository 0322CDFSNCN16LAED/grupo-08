const { v4 } = require("uuid");
const uuid = v4;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Rooms",
      [
        {
          id: uuid(),
          name: "Cocina",
        },
        {
          id: uuid(),
          name: "Living",
        },
        {
          id: uuid(),
          name: "Dormitorio",
        },
        {
          id: uuid(),
          name: "Comedor",
        },
        {
          id: uuid(),
          name: "Estudio",
        },
        {
          id: uuid(),
          name: "Infantil",
        },
        {
          id: uuid(),
          name: "Baños",
        },
        {
          id: uuid(),
          name: "Playroom",
        },
        {
          id: uuid(),
          name: "Exteriores",
        },
        {
          id: uuid(),
          name: "Otros",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rooms", null, {});
  },
};
