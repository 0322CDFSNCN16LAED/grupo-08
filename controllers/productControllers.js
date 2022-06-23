const db = require("../data/db-products");
const path = require("path");

const products = db.getAll();

module.exports = {
  // ver todos los productos
  index: (req, res) => {
    res.render("products/products", { productos: products });
  },
  //ver el detalle de cada producto
  detail: (req, res) => {
    res.render("products/details", { producto: db.getOne(req.params.id) });
  },
  //crear un nuevo producto
  create: (req, res) => {
    res.render("products/products-create-form");
  },
  //accion de procesar el producto. CREAR
  store: function (req, res) {
    // armamos el array de ambientes
    let ambientes = [];
    if (req.body.cocina != undefined) {
      ambientes.push(req.body.cocina);
    }
    if (req.body.living != undefined) {
      ambientes.push(req.body.living);
    }
    res.send(ambientes);
    /*if(req.body.cocina == checked){
      res.send('cocina seleccionada');
    }*/
    //    if (products.length) {
    //     newProduct.id = products[products.length - 1].id + 1;
    // } else {
    //      newProduct.id = 1;
    //  }
    //  products.push(newProduct);
    //    db.saveAll(products);
    //   res.redirect("/products");
  },

  // vista para editar detalles de productos
  edit: (req, res) => {
    let id = req.params.id;
    let productEdit = products.find((productos) => productos.id == id);

    console.log(req.file)
       
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
