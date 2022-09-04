const { body } = require("express-validator");

let psswrd = body("password");
/*VALIDACIONES BASICAS CON EXPRESS VALIDATOR PARA EL EDIT USER*/
const editUserValidations = [
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
  /*body("password")
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      "La contraseña debe tener letras mayúsculas, minusculcas, un numero, un carácter especial y minimo 8caracteres."
    ),*/
  body("rpassword").custom((value, { req }) => {
    if (value != "" && value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    } else {
      return true;
    }
  }),
];

module.exports = editUserValidations;
