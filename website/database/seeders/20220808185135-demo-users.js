const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userRole = await db.UserRole.findAll();
    const pass = await bcrypt.hash("Clave*123", 10);
    await queryInterface.bulkInsert(
      "Users",
      Array(50)
      .fill(0)
      .map(() => {
        return {
          id: uuid(),
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          password: pass,
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: userRole[Math.floor(Math.random() * userRole.length)].id,
        };
      })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
