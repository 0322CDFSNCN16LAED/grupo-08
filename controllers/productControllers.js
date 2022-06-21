const db = require("../data/db-products");
const path = require("path");

let products = db.getAll();

module.exports = {
  // ver todos los productos
  index: (req, res) => {
    products = db.getAll();
    res.render("products/products", { productos: products });
  },
  //ver el detalle de cada producto
  detail: (req, res) => {
    res.render("products/details", { producto: db.getOne(req.params.id) });
  },
  //crear un nuevo producto
  create: (req, res) => {
    res.send("vista para crear producto");
  },
  //accion de procesar el producto. CREAR
  store: (req, res) => {
    res.send("procesa el crear producto");
  },
  // vista para editar detalles de productos
  edit: (req, res) => {
    let id = req.params.id;
    let productEdit = products.find((productos) => productos.id == id);
    res.render("products/productos-edit-product", {
      productoEditar: productEdit,
    });
  },
  // accion de actualizar un producto.
  update: (req, res) => {
    const productEditIndex = db.getAll(req.params.id);

    products.splice(productEditIndex, 1, req.body);

    db.saveAll(products);
    res.send("vengo a moelstar");
    // res.redirect("/products");
  },
  // accion de eliminar un producto
  destroy: (req, res) => {
    const filterProductos = products.filter((producto) => {
      return producto.id != req.params.id;
    });

    db.saveAll(filterProductos);

    res.redirect("/products");
  },
};
