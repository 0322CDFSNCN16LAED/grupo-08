const path = require("path");

module.exports = {
    login: function (req, res) {
        res.render("users/login");
    },
    register: function (req, res) {
        res.render("users/register");
    },
    carritoCompras: function (req, res) {
        res.render("products/carritocompras");  
    },
    pago: function (req, res) {
        res.render("users/pago");
    },
} 
    