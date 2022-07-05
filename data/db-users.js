const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "./users-db.json");

module.exports = {
  getAll: function () {
    return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
  },
  saveAll: function (users) {
    const fileTxt = JSON.stringify(users, null, 4);

    fs.writeFileSync(usersFilePath, fileTxt);
  },
  getOne: function (id) {
    return this.getAll().find((p) => p.id == id);
  },
  getByField: function (field, valor) {
    return this.getAll().find((oneUser) => oneUser[field] === valor);
  },
};
