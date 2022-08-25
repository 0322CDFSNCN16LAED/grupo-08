const db = require("../database/models");
const { Op } = require("sequelize");

const { validationResult } = require("express-validator");

module.exports = {
  // ver todos los productos
  index: async (req, res) => {
    try {
      products = await db.Product.findAll({
        include: ["Category"],
        order: [["name", "asc"]],
      });
    } catch (error) {
      console.error("Error listar productos ---> " + error);
    }
    res.render("products/products", { productos: products });
  },
  //ver el detalle de cada producto
  detail: async (req, res) => {
    try {
      let producto = await db.Product.findByPk(req.params.id, {
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
      let vInstallments = await db.Installment.findAll({
        order: [["name", "asc"]],
      });
      let vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
      let vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
      let vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
      let vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
      let vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
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

  //para hacer la validacion 
    const resultValidation = validationResult(req)
  // llamo a las variables
    let vInstallments = await db.Installment.findAll({order: [["name", "asc"]] });
    let vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
    let vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
    let vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
    let vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
    let vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });

    if (resultValidation.errors.length >0) { // si el array es mayor a cero quiere decir que hay errores
      return res.render("products/products-create-form", {
        errors: resultValidation.mapped(),//convierte al array en un obj literal
        oldData: req.body,
        vInstallments,
        vCategorys,
        vStyles,
        vRooms,
        vColours,
        vBrands,
    })
  } else { 
    try {
      let resp = await db.Product.create({
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
          await db.RoomProduct.create({
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
  }
 },
  // vista para editar detalles de productos
  edit: async (req, res) => {
    const productEdit = await db.Product.findByPk(req.params.id, {
      include: ["Rooms"],
    });
    const vInstallments = await db.Installment.findAll({
      order: [["name", "asc"]],
    });
    const vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
    const vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
    const vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
    const vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
    const vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
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
            productoEdit: productoEdit,
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
    const oldProduct = db.Product.findByPk(productId);
    try {
      let resp = await db.Product.update(
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
      await db.RoomProduct.destroy({ where: { productId: productId } });
      //await oldProduct.setRooms([]);
      if (ambientes.length > 0) {
        ambientes.forEach(async (element) => {
          await db.RoomProduct.create({
            roomId: element,
            productId: productId,
          });
        });
      }
     // res.redirect("/products");
    } catch (error) {
      res.send(error);
    }
    const resultValidation = validationResult(req)
    // llamo a las variables
      let vInstallments = await db.Installment.findAll({order: [["name", "asc"]] });
      let vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
      let vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
      let vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
      let vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
      let vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
  
      if (resultValidation.errors.length >0) { // si el array es mayor a cero quiere decir que hay errores
        return res.render("productos-edit-product", {
          errors: resultValidation.mapped(),//convierte al array en un obj literal
          oldData: req.body,
          vInstallments,
          vCategorys,
          vStyles,
          vRooms,
          vColours,
          vBrands,
      })
    } else {res.redirect("/products");
  
  }
  
  },
  // accion de eliminar un producto
  destroy: async (req, res) => {
    const productoId = req.params.id;
    try {
      const product = await db.Product.findByPk(productoId);
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
      const productos = await db.Product.findAll({
        include: ["Category"],
        where: {
          name: { [Op.like]: "%" + productSearch + "%" },
        },
        order: [["name", "ASC"]],
      });
      if (productos.length > 0) {
        res.render("products/products", { productos });
      } else {
        const allProducts = await db.Product.findAll({ include: ["Category"] });
        res.render("products/products", { productos: allProducts });
      }
    } catch (error) {
      console.error("search error ---> " + error);
    }
  },
};
