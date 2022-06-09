const path = require("path");

module.exports = {
  index: (req, res) => {
    res.send("enviar a la vista de todos los productos");
  },
  detail: (req, res) => {
    res.send("vista para mostrar el detalle del producto");
  },
  create: (req, res) => {
    res.send("vista para crear producto");
  },
  store: (req, res) => {
    res.send("procesa el crear producto");
  },
  edit: (req, res) => {
    res.send("vista editar product");
  },
  update: (req, res) => {
    res.send("procesa la actualizacion del product");
  },
  destroy: (req, res) => {
    res.send("procesa eliminar product");
  } /*,
  productoLamp: function (req, res) {
    res.render("products/producto-lamp");
  },
  productoSilla: function (req, res) {
    res.render("products/producto-silla");
  },
  productoBiblioteca: function (req, res) {
    res.render("products/producto-biblioteca");
  },
  ingresos: function (req, res) {
    res.render("products/ingresos");
  },
  ofertas: function (req, res) {
    res.render("products/ofertas");
  },
  tendenciasLivings: function (req, res) {
    res.render("products/ultimas-tendencias-livings");
  },*/,
};
