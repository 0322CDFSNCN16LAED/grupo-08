const { body } = require("express-validator");

/*VALIDACIONES BASICAS CON EXPRESS VALIDATOR PARA EL REGISTER*/
const basicRegisterValidations = [
  body("name")
    .notEmpty()
    .withMessage("Debe ingresar un nombre de usuario")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener un minimo de 2 caracteres"),
  body("lastname")
    .notEmpty()
    .withMessage("Debe ingresar un apellido de usuario")
    .isLength({ min: 2, max: 100 })
    .withMessage("El apellido debe tener un minimo de 2 caracteres"),
  body("email")
    .isEmail()
    .withMessage("Debe ingresar una dirección de correo electrónico válida"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Debe ingresar un teléfono de contacto"),
  body("address")
    .notEmpty()
    .withMessage(
      "Debe ingresar una calle, altura y -de ser necesario- piso y departamento"
    ),
  body("city")
    .notEmpty()
    .withMessage("Debe ingresar la ciudad o localidad correspondiente"),
  body("state")
    .notEmpty()
    .withMessage("Debe ingresar la provincia correspondiente"),
  body("country")
    .notEmpty()
    .withMessage("Debe ingresar el país correspondiente"),
  body("zipCode").notEmpty().withMessage("Debe ingresar su código postal"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Debe ingresar una contraseña con minimo 8 caracteres.")
    .isAlphanumeric()
    .withMessage("Debe ingresar una contraseña alfanumérica")
  /*  .matches(/A-Z/)
    .withMessage(
      "La contraseña debe tener letras mayúsculas, minusculcas, un numero y un carácter especial."
    ) */ ,
  body("rpassword")
    .notEmpty()
    .withMessage("Debe volver a ingresar la contraseña"),
];

module.exports = basicRegisterValidations;
