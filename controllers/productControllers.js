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
    try {
      products = await Product.findAll({
        include: ["Category"],
      });
    } catch (error) {
      console.error("Error listar productos ---> " + error);
    }
    res.render("products/products", { productos: products });
  },
  //ver el detalle de cada producto
  detail: async (req, res) => {
    try {
      let producto = await Product.findByPk(req.params.id, {
        include: ["Category", "Style", "Room"],
      });
      res.render("products/details", { producto });
    } catch (error) {
      console.error("error en Detalle de producto ---->" + error);
    }
  },
  //crear un nuevo producto
  create: async (req, res) => {
    try {
      let vInstallments = await Installment.findAll();
      let vCategorys = await Category.findAll();
      let vRooms = await Room.findAll();
      let vStyles = await Style.findAll();
      let vColours = await Colour.findAll();
      let vBrands = await Brand.findAll();
      res.render("products/products-create-form", {
        vInstallments,
        vCategorys,
        vStyles,
        vRooms,
        vColours,
        vBrands,
      });
    } catch (error) {
      console.error("Error en Create Product---> " + error);
    }
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
  edit: async (req, res) => {
    const productEdit = Product.findByPk(req.params.id);
    let vInstallments = await Installment.findAll();
    let vCategorys = await Category.findAll();
    let vRooms = await Room.findAll();
    let vStyles = await Style.findAll();
    let vColours = await Colour.findAll();
    let vBrands = await Brand.findAll();

    res.render("products/productos-edit-product", {
      productoEditar: productEdit,
      vInstallments,
      vCategorys,
      vRooms,
      vStyles,
      vColours,
      vBrands,
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
  destroy: async (req, res) => {
    const productoId = req.params.id;
    try {
      const product = await Product.findByPk(productoId);
      if (product) {
        await RoomProduct.destroy({ where: { productId: productoId } });
        await Product.destroy({ where: { id: productoId } });
        res.redirect("/products");
      }
    } catch (error) {
      res.send("el errrrrrrrrrrrror " + error);
    }

    /*

      
      console.log("el valor de producr -->" + productId);
      await Product.destroy({ where: { id: productId }, force: true });

      /*await Product.destroy({
        where: { id: productId },
        force: true,
      });*/

    /*  } catch (error) {
      console.error(error);
      res.send(error);
    }*/
  },
};
