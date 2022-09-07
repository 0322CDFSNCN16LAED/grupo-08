const { body } = require("express-validator");

/*VALIDACIONES BASICAS CON EXPRESS VALIDATOR PARA EL EDIT USER*/
const editUserValidations = [
  body("name")
    .notEmpty()
    .withMessage("Debe ingresar un nombre de usuario")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener un minimo de 2 caracteres"),
  body("lastname")
    .notEmpty()
    .withMessage("Debe ingresar un apellido de usuarioooo")
    .isLength({ min: 2, max: 100 })
    .withMessage("El apellido debe tener un minimo de 2 caracteres"),
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
  body("userRoleId").notEmpty().withMessage("Debe indicar el Rol del usuario"),
];

module.exports = editUserValidations;
