const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Installments",
      [
        {
          id: uuid(),
          name: "1 cuota sin interes",
        },
        {
          id: uuid(),
          name: "3 cuotas sin interes",
        },
        {
          id: uuid(),
          name: "6 cuotas sin interes",
        },
        {
          id: uuid(),
          name: "12 cuotas sin interes",
        },
        {
          id: uuid(),
          name: "18 cuotas sin interes",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Installments", null, {});
  },
};
