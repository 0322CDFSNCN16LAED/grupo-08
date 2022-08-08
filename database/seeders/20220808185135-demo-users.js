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
          userRoleId: "98b2fc96-48f1-44d1-86ed-60c2955a2392",
          addressId: "30354bac-3d03-4d88-b975-d949349e1163",
        },
        {
          id: uuid(),
          name: "Mariana",
          lastname: "Candia",
          email: "mariana@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "98b2fc96-48f1-44d1-86ed-60c2955a2392",
          addressId: "30354bac-3d03-4d88-b975-d949349e1163",
        },
        {
          id: uuid(),
          name: "Camila",
          lastname: "Mandieta",
          email: "camila@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "98b2fc96-48f1-44d1-86ed-60c2955a2392",
          addressId: "30354bac-3d03-4d88-b975-d949349e1163",
        },
        {
          id: uuid(),
          name: "Nahuel",
          lastname: "Blanco",
          email: "nahuel@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "98b2fc96-48f1-44d1-86ed-60c2955a2392",
          addressId: "30354bac-3d03-4d88-b975-d949349e1163",
        },
        {
          id: uuid(),
          name: "Gaspar",
          lastname: "Costo",
          email: "gaspar@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "98b2fc96-48f1-44d1-86ed-60c2955a2392",
          addressId: "30354bac-3d03-4d88-b975-d949349e1163",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
