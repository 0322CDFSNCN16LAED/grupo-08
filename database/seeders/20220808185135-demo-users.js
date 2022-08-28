const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userRole = await db.UserRole.findAll();

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuid(),
          name: "Usuario",
          lastname: "De Prueba",
          email: "usuario@gmail.com",
          password: await bcrypt.hash("123456", 10),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: userRole[0].id,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
