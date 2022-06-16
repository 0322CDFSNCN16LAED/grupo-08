const db = require("../data/db-products");
const path = require("path");

const products = db.getAll();

module.exports = {
  index: (req, res) => {
    res.render("products/products", { productos: products });
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
  },
};
