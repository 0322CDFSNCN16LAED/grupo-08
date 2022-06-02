const path = require("path");

module.exports = {
  home: function (req, res) {
    res.render("products/home");
  },
  catalogo: function (req, res) {
    res.render("products/catalogo");
  },
  administracionProductos: function (req, res) {
    res.render("administracion-productos");
  },
};
