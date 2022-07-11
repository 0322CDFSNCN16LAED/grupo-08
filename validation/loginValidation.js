const { body } = require("express-validator");

const loginValidations = [
  body("email")
    .notEmpty()
    .withMessage("Debe ingresar una dirección de correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debe ingresar una dirección de correo electrónico válida"),
  body("password").notEmpty().withMessage("Debe ingresar su contraseña"),
];

module.exports = loginValidations;
