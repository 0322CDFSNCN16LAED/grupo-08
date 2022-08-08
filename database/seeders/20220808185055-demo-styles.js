const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Styles",
      [
        {
          id: uuid(),
          name: "Industrial",
        },
        {
          id: uuid(),
          name: "Nórdico",
        },
        {
          id: uuid(),
          name: "Mid Century Modern",
        },
        {
          id: uuid(),
          name: "Boho Chic",
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
    await queryInterface.bulkDelete("Styles", null, {});
  },
};
