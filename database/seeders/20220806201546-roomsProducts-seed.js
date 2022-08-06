const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Address",
      Array(20)
        .fill(0)
        .map(() => {
          return {};
        })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Address", null, {});
  },
};
