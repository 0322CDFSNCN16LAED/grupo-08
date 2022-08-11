const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

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
        include: ["Category", "Style", "Rooms"],
      });
      //res.send(producto);
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
    try {
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
    } catch (error) {
      console.log("error en create " + error);
      res.send(error);
    }
  },
  // vista para editar detalles de productos
  edit: async (req, res) => {
    const productEdit = await Product.findByPk(req.params.id, {
      include: ["Rooms"],
    });
    const vInstallments = await Installment.findAll();
    const vCategorys = await Category.findAll();
    const vRooms = await Room.findAll();
    const vStyles = await Style.findAll();
    const vColours = await Colour.findAll();
    const vBrands = await Brand.findAll();
    Promise.all([
      productEdit,
      vInstallments,
      vCategorys,
      vRooms,
      vStyles,
      vColours,
      vBrands,
    ])
      .then(
        ([
          productoEdit,
          allInstallments,
          allCategorys,
          allRooms,
          allStyles,
          allColours,
          allBrands,
        ]) => {
          res.render("products/productos-edit-product", {
            productoEditar: productoEdit,
            vInstallments: allInstallments,
            vCategorys: allCategorys,
            vRooms: allRooms,
            vStyles: allStyles,
            vColours: allColours,
            vBrands: allBrands,
          });
        }
      )
      .catch((error) => res.send(error));
  },
  // accion de actualizar un producto.
  update: async (req, res) => {
    let productId = req.params.id;
    const oldProduct = Product.findByPk(productId);
    try {
      let resp = await Product.update(
        {
          ...req.body,
          price: req.body.price.trim().replace(",", "."),
          freeDelivery: req.body.freeDelivery ? true : false,
          picture: req.file
            ? "/images/products/" + req.file.filename
            : oldProduct.picture,
        },
        {
          where: { id: productId },
        }
      );
      let ambientes = [];
      if (resp) {
        if (req.body.rooms) {
          if (typeof req.body.rooms == "string") {
            ambientes.push(req.body.rooms);
          } else {
            ambientes = req.body.rooms;
          }
        }
      }
      await RoomProduct.destroy({ where: { productId: productId } });
      //await oldProduct.setRooms([]);
      if (ambientes.length > 0) {
        ambientes.forEach(async (element) => {
          await RoomProduct.create({
            roomId: element,
            productId: productId,
          });
        });
      }
      res.redirect("/products");
    } catch (error) {
      res.send(error);
    }
  },
  // accion de eliminar un producto
  destroy: async (req, res) => {
    const productoId = req.params.id;
    try {
      const product = await Product.findByPk(productoId);
      if (product) {
        await product.setRooms([]);
        //await product.setOrder([]); falta el logico de orders
        await product.destroy();
        res.redirect("/products");
      }
    } catch (error) {
      res.send("el errrrrrrrrrrrror " + error);
    }
  },
  // buscar un producto
  search: async (req, res) => {
    const productSearch = req.query.search.trim();
    try {
      const productos = await Product.findAll({
        include: ["Category"],
        where: {
          name: { [Op.like]: "%" + productSearch + "%" },
        },
        order: [["id", "ASC"]],
      });
      if (productos.length > 0) {
        res.render("products/products", { productos });
      } else {
        const allProducts = await Product.findAll({ include: ["Category"] });
        res.render("products/products", { productos: allProducts });
      }
    } catch (error) {
      console.error("search error ---> " + error);
    }
  },
};
