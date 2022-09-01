const path = require("path");

module.exports = {
  index: function (req, res) {
    res.render("home");
  },
  catalogo: function (req, res) {
    res.render("catalogo");
  },
  administracionProductos: function (req, res) {
    res.render("administracion-productos");
  },
  carritoCompras: function (req, res) {
    res.render("carritocompras");
  },
  pago: function (req, res) {
    res.render("pago");
  },
};
