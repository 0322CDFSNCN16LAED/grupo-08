const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "UserRoles",
      [
        {
          id: uuid(),
          name: "user",
        },
        {
          id: uuid(),
          name: "seller",
        },
        {
          id: uuid(),
          name: "admin",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Address", null, {});
  },
};
