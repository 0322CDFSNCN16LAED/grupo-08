const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./ambientes-db.json");

module.exports = {
  getAll: function () {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  },
  getOne: function (id) {
    return this.getAll().find((p) => p.id == id);
  },
};
