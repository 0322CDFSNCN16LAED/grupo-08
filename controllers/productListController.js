const db = require("../database/models");
const { Op } = require("sequelize");

// Listar productos por ambiente, por estilo, por categoria, por sale

module.exports = {
    rooms: (req, res) => {
        res.send('Lista products por ambientes')
    },
    styles: (req, res) => {
        res.send('listado products por estilo')
    },
    categories: (req, res) => {
        res.send('listado products por categoria')
    },
    inSale: (req, res) => {
        res.send('listado producst por ofertas')
    },
};