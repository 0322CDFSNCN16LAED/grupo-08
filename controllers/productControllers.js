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
    let id = req.params.id
    let productEdit = products.find(productos => productos.id == id)
    res.render("products/productos-edit-product", {productoEditar: productEdit})
  },
  update: (req, res) => {
    const productEditIndex = db.getAll(req.params.id)

    products.splice(productEditIndex, 1, req.body)

    db.saveAll(products)
      res.send("vengo a moelstar");
   // res.redirect("/products");
  },
  destroy: (req, res) => {
    const filterProductos = products.filter((producto)=>{
      return producto.id != req.params.id
    })

    db.saveAll(filterProductos)
    
    res.redirect("/products");
  },
};
