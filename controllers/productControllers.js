const db = require("../data/db-products");
const dbcuotas = require("../data/db-cuotas");
const dbcategoriaProducts = require("../data/db-categoria-product");
const dbestilos = require("../data/db-estilos");
const dbambientes = require("../data/db-ambientes");

let cuotas = dbcuotas.getAll();
const categorias = dbcategoriaProducts.getAll();
const estilos = dbestilos.getAll();
const ambientes = dbambientes.getAll();

let products = db.getAll();
/* cambiando a la DB */
const { Installment } = require("../database/models");
const { Category } = require("../database/models");
const { Room } = require("../database/models");
const { Style } = require("../database/models");
const { Colour } = require("../database/models");
const { Brand } = require("../database/models");
const { Product } = require("../database/models");
const { RoomProduct } = require("../database/models");

module.exports = {
  // ver todos los productos
  index: async (req, res) => {
    // try {
    products = await Product.findAll({
      include: ["Category"],
    });
    //   console.log(products);
    //  } catch (error) {
    //   console.error("aca el error ---> " + error);
    //  }
    res.render("products/products", { productos: products });
  },
  //ver el detalle de cada producto
  detail: (req, res) => {
    res.render("products/details", { producto: db.getOne(req.params.id) });
  },
  //crear un nuevo producto
  create: async (req, res) => {
    //try {
    let vInstallments = await Installment.findAll();
    let vCategorys = await Category.findAll();
    let vRooms = await Room.findAll();
    let vStyles = await Style.findAll();
    let vColours = await Colour.findAll();
    let vBrands = await Brand.findAll();
    //} catch (error) {
    //  console.error("aca el error ---> " + error);
    // }

    res.render("products/products-create-form", {
      vInstallments,
      vCategorys,
      vStyles,
      vRooms,
      vColours,
      vBrands,
    });
  },
  //accion de procesar el producto. CREAR
  store: async function (req, res) {
    let resp = await Product.create({
      ...req.body,
      price: req.body.price.trim().replace(",", "."),
      freeDelivery: req.body.freeDelivery ? true : false,
      picture: req.file
        ? "/images/products/" + req.file.filename
        : "/images/products/default-image.png",
    });
    let ambientes = [];
    if (req.body.rooms) {
      if (typeof req.body.rooms == "string") {
        ambientes.push(req.body.rooms);
      } else {
        ambientes = req.body.rooms;
      }
    }
    if (ambientes.length > 0) {
      ambientes.forEach(async (element) => {
        await RoomProduct.create({
          roomId: element,
          productId: resp.dataValues.id,
        });
      });
    }
    res.redirect("/products");
  },
  // vista para editar detalles de productos
  edit: (req, res) => {
    let id = req.params.id;
    let productEdit = products.find((productos) => productos.id == id);
    res.render("products/productos-edit-product", {
      productoEditar: productEdit,
      cuotas,
      categorias,
      estilos,
      ambientes,
    });
  },
  // accion de actualizar un producto.
  update: (req, res) => {
    products = db.getAll();
    const productIndex = products.findIndex((p) => p.id == req.params.id);
    const product = products[productIndex];

    let ambientes = [];
    if (req.body.ambientes) {
      if (typeof req.body.ambientes == "string") {
        ambientes.push(req.body.ambientes);
      } else {
        ambientes = req.body.ambientes;
      }
    }
    // armo el objeto a modificar
    const editProduct = {
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      ambiente: ambientes,
      estilo: req.body.estilos,
      precioContado: req.body.precioContado,
      cantidadDeCuotas: req.body.cantidadDeCuotas,
      precioCuota: req.body.precioCuota,
      envioGratis: !req.body.envioGratis ? false : true,
      alt: req.body.alt,
      descripcion: req.body.descripcion,
      medidas: req.body.medidas,
      color: req.body.color,
      detalles: req.body.detalles,
      infoExtra: req.body.infoExtra,
      detalles: req.body.detalles.split(","),
      infoExtra: req.body.infoExtra.split(","),
      id: product.id,
    };
    if (req.file) {
      editProduct.imagen = "/images/products/" + req.file.filename;
    } else {
      editProduct.imagen = product.imagen;
    }

    products[productIndex] = editProduct;
    db.saveAll(products);
    res.redirect("/products");
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
