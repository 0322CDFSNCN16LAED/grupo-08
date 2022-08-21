const { body } = require("express-validator");

/*VALIDACIONES BASICAS CON EXPRESS VALIDATOR PARA EL REGISTER*/
const basicCreateValidationsProducts = [
  body("name").notEmpty().withMessage("Debe ingresar un nombre del producto"),
  body("price").notEmpty().withMessage("Debe ingresar el precio del producto"),
  body("installmentId").isEmail().withMessage("Debe ingresar alguna opcion valida"),
  body("colourId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("categoryId").notEmpty().withMessage("Debe seleccionar alguna categoria"),
  body("styleId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("brandId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("rooms").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("description").notEmpty().withMessage("Debe dar una breve descripcion del producto"),
  body("details").notEmpty().withMessage("Debe dar detalles del producto"),
  body("measurements").notEmpty().withMessage("Debe colocar las medidas del producto"),
  body("freeDelivery").notEmpty().withMessage("Debe seleccionar alguna opcion"),
];


module.exports = basicCreateValidationsProducts;