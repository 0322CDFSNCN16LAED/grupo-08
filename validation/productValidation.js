const { body } = require("express-validator");
const path = require("path");

/*VALIDACIONES BASICAS CON EXPRESS VALIDATOR PARA EL REGISTER*/
const basicCreateValidationsProducts = [
  body("name")
              .isLength({ min: 5 })
              .withMessage("Debe ingresar un nombre del producto de minimo 5 caracteres"),
  body("categoryId").notEmpty().withMessage("Debe seleccionar alguna categoria"),
  body("rooms").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("styleId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("price").isNumeric()
               .withMessage("Debe ingresar el precio del producto de manera numerica"),
  body("installmentId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("brandId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("description").isLength({ min: 20 })
                     .withMessage("Debe dar una breve descripcion del producto de minimo 20 caracteres"),
  body("colourId").notEmpty().withMessage("Debe ingresar alguna opcion valida"),
  body("picture").custom((value, {req})=> {
    let file = req.file;// obtengo el archivo
    let acceptedExtensions = [".jpg", "jepg", ".png", ".gif"];
    if (!file){//si no tengo nada aca 
      throw new Error("Debe subir una imagen del producto")
    } else {
      let fileExtension = path.extname(file.originalname);
    if(!acceptedExtensions.includes()){
      throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
    }
    }
    return true
  })
];


module.exports = basicCreateValidationsProducts;