const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuid(),
          name: "Norma",
          lastname: "Parada",
          email: "norma@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "585706da-aa55-4bd1-9180-698cce33c5a4",
          addressId: "088b1814-1d2c-4642-bee8-2afbaaa24e30",
        },
        {
          id: uuid(),
          name: "Mariana",
          lastname: "Candia",
          email: "mariana@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "585706da-aa55-4bd1-9180-698cce33c5a4",
          addressId: "088b1814-1d2c-4642-bee8-2afbaaa24e30",
        },
        {
          id: uuid(),
          name: "Camila",
          lastname: "Mandieta",
          email: "camila@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "585706da-aa55-4bd1-9180-698cce33c5a4",
          addressId: "088b1814-1d2c-4642-bee8-2afbaaa24e30",
        },
        {
          id: uuid(),
          name: "Nahuel",
          lastname: "Blanco",
          email: "nahuel@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "585706da-aa55-4bd1-9180-698cce33c5a4",
          addressId: "088b1814-1d2c-4642-bee8-2afbaaa24e30",
        },
        {
          id: uuid(),
          name: "Gaspar",
          lastname: "Costo",
          email: "gaspar@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "585706da-aa55-4bd1-9180-698cce33c5a4",
          addressId: "088b1814-1d2c-4642-bee8-2afbaaa24e30",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
