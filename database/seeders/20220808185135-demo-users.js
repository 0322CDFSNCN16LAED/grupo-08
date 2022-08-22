const { v4 } = require("uuid");
const uuid = v4;
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const db = require ('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    const address = await db.Address.findAll();
    const userRole = await db.UserRole.findAll();
    
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
          userRoleId: userRole[0].id,
          addressId: address[0].id ,
        },
        {
          id: uuid(),
          name: "Mariana",
          lastname: "Candia",
          email: "mariana@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: userRole[0].id,
          addressId: address[0].id,
        },
        {
          id: uuid(),
          name: "Camila",
          lastname: "Mandieta",
          email: "camila@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: userRole[0].id,
          addressId: address[0].id,
        },
        {
          id: uuid(),
          name: "Nahuel",
          lastname: "Blanco",
          email: "nahuel@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: userRole[0].id,
          addressId: address[0].id,
        },
        {
          id: uuid(),
          name: "Gaspar",
          lastname: "Costo",
          email: "gaspar@gmail.com",
          password: await bcrypt.hash("123456", 12),
          phoneNumber: 123456789,
          profilePic: "/images/usersProfiles/defaultImage.jpg",
          userRoleId: userRole[0].id,
          addressId: address[0].id,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
