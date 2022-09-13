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
      res.send("Error listar productos ---> " + error);
    }
    res.render("products/products", { productos: products });
  },
  //ver el detalle de cada producto
  detail: async (req, res) => {
    try {
      let producto = await db.Product.findByPk(req.params.id, {
        include: ["Category", "Style", "Rooms"],
      });
      res.render("products/details", { producto });
    } catch (error) {
      res.send("error en Detalle de producto ---->" + error);
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
      res.send("Error en Create Product---> " + error);
    }
  },
  //accion de procesar el producto. CREAR
  store: async function (req, res) {
    //para hacer la validacion
    const resultValidation = validationResult(req);
    // llamo a las variables
    let vInstallments = await db.Installment.findAll({order: [["name", "asc"]],});
    let vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
    let vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
    let vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
    let vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
    let vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
    //res.send(req.body);
    let ambientes = [];
    if (req.body.rooms) {
      if (typeof req.body.rooms == "string") {
        ambientes.push(req.body.rooms);
      } else {
        ambientes = req.body.rooms;
      }
    }
    req.body.rooms = ambientes;

    if (resultValidation.errors) {
      //res.send(req.body);

      // si el array es mayor a cero quiere decir que hay errores
      return res.render("products/products-create-form", {
        errors: resultValidation.mapped(), //convierte al array en un obj literal
        oldData: req.body,
        vInstallments,
        vCategorys,
        vStyles,
        vRooms,
        vColours,
        vBrands,
      });
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
        // guardamos en la muchos a muchos
        if (req.body.rooms) {
          let respRooms = resp.addRooms(req.body.rooms, {
            through: { selfGranted: false },
          });
        }
        res.redirect("/products");
      } catch (error) {
        res.send(error);
      }
    }
  },
  // vista para editar detalles de productos
  edit: async (req, res) => {
    /*const productEdit = await db.Product.findByPk(req.params.id, {
      include: ["Rooms"],
    });*/
    const productoEditar = await db.Product.findOne({
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
    const vInstallments = await db.Installment.findAll({order: [["name", "asc"]],});
    const vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
    const vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
    const vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
    const vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
    const vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
    //res.send(productEdit);
    res.render("products/productos-edit-product", {
      
      productoEditar: productoEditar,
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

    const resultValidation = validationResult(req);
 //   const oldProduct = db.Product.findByPk(req.params.id);
    
    /*const productEdit = await db.Product.findOne({
      where: { id: req.params.id },
      include: ["Rooms"],
      paranoid: true,
    });*/
    /*const vInstallments = req.body.installmentId
    const vCategorys = req.body.categoryId 
    const vRooms = req.body.rooms
    const vStyles = req.body.styleId  
    const vColours = req.body.colourId   
    const vBrands = req.body.brandId 

    const vInstallments = await db.Installment.findAll({order: [["name", "asc"]],});
    const vCategorys = await db.Category.findAll({ order: [["name", "asc"]] });
    const vRooms = await db.Room.findAll({ order: [["name", "asc"]] });
    const vStyles = await db.Style.findAll({ order: [["name", "asc"]] });
    const vColours = await db.Colour.findAll({ order: [["name", "asc"]] });
    const vBrands = await db.Brand.findAll({ order: [["name", "asc"]] });
  
    const vInstallments = db.Installment.findByPk(req.params.id);
    const vCategorys = db.Category.findByPk(req.params.id);
    const vRooms = db.Room.findByPk(req.params.id);
    const vStyles = db.Style.findByPk(req.params.id);
    const vColours = db.Colour.findByPk(req.params.id);
    const vBrands = db.Brand.findByPk(req.params.id);
    res.send(req.body);*/

   /* let ambientes = [];
    if (req.body.rooms) {
      if (typeof req.body.rooms == "string") {
        ambientes.push(req.body.rooms);
      } else {
        ambientes = req.body.rooms;
      }
    }
    req.body.rooms = ambientes;*/

    /*if (resultValidation.errors) {
      //res.send(req.body);
      return res.render("products/productos-edit-product", {
        errors: resultValidation.mapped(), //convierte al array en un obj literal
        oldData: req.body,
        productoEditar: oldProduct,
        vInstallments,
        vCategorys,
        vStyles,
        vRooms,
        vColours,
        vBrands,
      })
    } else {*/

    // OTRA VERSION DEL EDIT PRODUCTOOOOOOO---------//
    let rooms = await db.Room.findAll()
    const oldProduct = db.Product.findByPk(req.params.id, 
      {include: ["Category", "Colour", "Brand", "Installment", "Style"],
  });
    //capturo el registro a modificar
    let product = await db.Product.findByPk(req.params.id, {
      include: ["Category", "Colour", "Brand", "Installment", "Style"]
    });
    // verifico
    if (!resultValidation.isEmpty()) {
      const voldData = {
        ...req.body,
        id: req.params.id,
        profilePic: "defaultImage.jpg",
      };
      res.render("products/productos-edit-product", {
        //renderizo el formulario
        errors: resultValidation.mapped(), // con los errores mappeados y
        oldData: voldData, // los datos que sí pasaron la validacion
        rooms,
      });
    } else {
      // si no hay errores
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
      } 
    } 
  }
    catch (error) {
        res.send("aca hay un error  " + error);
      }
    }
    },  // accion de eliminar un producto
  destroy: async (req, res) => {
    const productoId = req.params.id;
    try {
      const product = await db.Product.findByPk(productoId);
      if (product) {
        await product.setRooms([]);
        //await product.setOrder([]); falta el logico de orders
        await product.destroy();

        res.redirect("/products/");
      }
    } catch (error) {
      res.send("el errrrrrrrrrrrror " + error);
    }
  },
  // buscar un producto
  search: async (req, res) => {
    //res.send("esta llegando aqui");
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
      res.send("search error ---> " + error);
    }
  },
};


