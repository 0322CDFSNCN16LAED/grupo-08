const path = require("path");

module.exports = {
  productoLamp: function (req, res) {
    res.render("products/producto-lamp");
  },
  productoSilla: function (req, res) {
    res.render("products/producto-silla");
  },
  producto: function (req, res) {
    res.render("products/producto");
  },
  ingresos: function (req, res) {
    res.render("products/ingresos");
  },
  ofertas: function (req, res) {
    res.render("products/ofertas");
  },
  tendenciasLivings: function (req, res) {
    res.render("products/ultimas-tendencias-livings");
  },
}