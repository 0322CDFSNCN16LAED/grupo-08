const path = require("path");

module.exports = {
  home: function (req, res) {
    res.render("home");
  },
  catalogo: function (req, res) {
    res.render("catalogo");
  },
  administracionProductos: function (req, res) {
    res.render("administracion-productos");
  },
};
