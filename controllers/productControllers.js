const db = require("../database/models");
const { Op } = require("sequelize");

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
  //vista crear un nuevo producto
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
    try {
      let resp = await db.Product.create({
        ...req.body,
        price: req.body.price.trim().replace(",", "."),
        freeDelivery: req.body.freeDelivery ? true : false,
        picture: req.file
          ? "/images/products/" + req.file.filename
          : "/images/products/default-image.png",
      });
      // guardamos en la muchos a muchos
      if (req.body.rooms) {
        let respRooms = resp.addRooms(req.body.rooms, {
          through: { selfGranted: false },
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
    /*const productEdit = await db.Product.findByPk(req.params.id, {
      include: ["Rooms"],
    });*/
    const productEdit = await db.Product.findOne({
      where: { id: req.params.id },
      include: ["Rooms"],
      paranoid: true,
    });
    /*const productEdit = await db.Product.findOne(
      { where: {id: req.params.id, } },
      {
        include: ["Rooms"],
      }
    );*/
    //res.send(productEdit);
    const vInstallments = await db.Installment.findAll({
      order: [["name", "asc"]],
    });
    const vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
    const vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
    const vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
    const vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
    const vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
    //res.send(productEdit);
    res.render("products/productos-edit-product", {
      productoEditar: productEdit,
      vInstallments: vInstallments,
      vCategorys: vCategorys,
      vRooms: vRooms,
      vStyles: vStyles,
      vColours: vColours,
      vBrands: vBrands,
    });
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
        console.log(
          "valor de body rooms------------------------------> " + req.body.rooms
        );
        if (req.body.rooms) {
          if (typeof req.body.rooms == "string") {
            ambientes.push(req.body.rooms);
          } else {
            ambientes = req.body.rooms;
          }
        }
      }
      console.log(
        "aqui el valro de abienntes******************************",
        ambientes
      );
      await db.RoomProduct.destroy({ where: { productId: productId } });
      /*if (ambientes.length > 0) {
        ambientes.forEach(async (element) => {
          await db.RoomProduct.create({
            roomId: element,
            productId: productId,
          });
        });
      }*/
      res.redirect("/products");
    } catch (error) {
      res.send("aca hay un error  " + error);
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
