const path = require("path");

module.exports = {
  home: function (req, res) {
    res.render("products/home");
  },

  carritoCompras: function (req, res) {
    res.render("products/carritocompras");
  },

  catalogo: function (req, res) {
    res.render("products/catalogo");
  },

  ingresos: function (req, res) {
    res.render("products/ingresos");
  },

  login: function (req, res) {
    res.render("users/login");
  },

  ofertas: function (req, res) {
    res.render("products/ofertas");
  },

  pago: function (req, res) {
    res.render("users/pago");
  },

  productoLamp: function (req, res) {
    res.render("products/producto-lamp");
  },

  productoSilla: function (req, res) {
    res.render("products/producto-silla");
  },

  producto: function (req, res) {
    res.render("products/producto");
  },
  register: function (req, res) {
    res.render("users/register");
  },

  tendenciasLivings: function (req, res) {
    res.render("products/ultimas-tendencias-livings");
  },
};
