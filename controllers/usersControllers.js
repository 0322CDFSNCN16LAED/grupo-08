const path = require("path");

module.exports = {
  login: function (req, res) {
    res.render("users/login");
  },
  register: function (req, res) {
    res.render("users/register");
  },
};
