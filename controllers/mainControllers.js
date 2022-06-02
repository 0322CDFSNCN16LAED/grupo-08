 const path = require('path');

 module.exports  = {
    home: function (req, res) {
       res.render("home");
    },

    carritoCompras: function (req, res) {
        res.render("carritocompras")
    },

    catalogo: function (req, res) {
        res.render("catalogo")
    },

    ingresos: function (req, res) {
        res.render("ingresos")
    },

    login: function (req, res) {
        res.render("login")
    },

    ofertas: function (req, res) {
        res.render("ofertas")
    },

    pago: function (req, res) {
        res.render("pago")
    },

    productoLamp: function (req, res) {
        res.render("producto-lamp")
    },

    productoSilla: function (req, res) {
        res.render("producto-silla")
    },

    producto: function (req, res) {
        res.render("producto")
    },
    register: function (req, res) {
        res.render("register")
    },

    tendenciasLivings: function (req, res) {
        res.render("ultimas-tendencias-livings")
    },
};

/*
module.exports  = {
    home: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/home.html"));
    },

    carritoCompras: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/carritocompras.html"))
    },

    catalogo: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/catalogo.html"))
    },

    ingresos: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/ingresos.html"))
    },

    login: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/login.html"))
    },

    ofertas: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/ofertas.html"))
    },

    pago: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/pago.html"))
    },

    productoLamp: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/producto-lamp.html"))
    },

    productoSilla: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/producto-silla.html"))
    },

    producto: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/producto.html"))
    },
    register: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/register.html"))
    },

    tendenciasLivings: function (req, res) {
        res.sendFile(path.join(__dirname, "../views/ultimas-tendencias-livings.html"))
    },
}
*/