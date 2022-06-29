const {body} = require('express-validator');

/*VALIDACIONES BASICAS CON EXPRESS VALIDATOR PARA EL REGISTER*/
const basicRegisterValidations = [
    body('nombre').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
    body('apellido').notEmpty().withMessage('Debe ingresar un apellido de usuario'),
    body('email').isEmail().withMessage('Debe ingresar una dirección de correo electrónico válida'),
    body('telefono').notEmpty().withMessage('Debe ingresar un teléfono de contacto'),
    body('direccion').notEmpty().withMessage('Debe ingresar una dirección'),
]

module.exports = basicRegisterValidations