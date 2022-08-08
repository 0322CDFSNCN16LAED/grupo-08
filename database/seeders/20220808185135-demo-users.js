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
          userRoleId: "1ae647fc-39bc-4137-bba8-1f3afbd3c2ec",
          addressId: "1e5cface-a6dd-4875-bb27-b1b5ed247b97",
        },
        {
          id: uuid(),
          name: "Mariana",
          lastname: "Candia",
          email: "mariana@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "1ae647fc-39bc-4137-bba8-1f3afbd3c2ec",
          addressId: "1e5cface-a6dd-4875-bb27-b1b5ed247b97",
        },
        {
          id: uuid(),
          name: "Camila",
          lastname: "Mandieta",
          email: "camila@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "1ae647fc-39bc-4137-bba8-1f3afbd3c2ec",
          addressId: "1e5cface-a6dd-4875-bb27-b1b5ed247b97",
        },
        {
          id: uuid(),
          name: "Nahuel",
          lastname: "Blanco",
          email: "nahuel@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "1ae647fc-39bc-4137-bba8-1f3afbd3c2ec",
          addressId: "1e5cface-a6dd-4875-bb27-b1b5ed247b97",
        },
        {
          id: uuid(),
          name: "Gaspar",
          lastname: "Costo",
          email: "gaspar@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: "1ae647fc-39bc-4137-bba8-1f3afbd3c2ec",
          addressId: "1e5cface-a6dd-4875-bb27-b1b5ed247b97",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
