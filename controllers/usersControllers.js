const path = require("path");
const fs = require("fs");
const db = require("../data/db-users");
const users = db.getAll();
const user = db.getOne();
const bcrypt = require('bcryptjs');


module.exports = {
  login: function (req, res) {
    res.render("users/login");
  },
  showRegister: function(req, res){
    res.render('users/register')
  },
  register: function (req, res) {
    const newUser = req.body;
    if (users.length) {
        newUser.id = users[users.length - 1].id + 1;
    } else {
        newUser.id = 1;
    }
    // FALTA GUARDAR EL ARCHIVO DE IMAGEN EN EL JSON. 
    //la imagen llega por el formulario via POST, se guarda en la carpeta public/images/usersProfiles
    // falta guardar ese dato en la base de datos json

    users.push(newUser);

    db.saveAll(users);

    res.redirect("/");
  },

  //vista de todos los usuarios.
  index: function(req, res){    
    res.render('users/index', {users: users})    
  },

  //ver datalle de cada usuario.
  detail: function(req, res){
    res.render('../views/users/user-detail', { user: db.getOne(req.params.id) });    
  },
  edit: function(req, res){                   
    const userToEdit =  db.getOne(req.params.id);        
    res.render('users/edit-user', { userToEdit: userToEdit });
  },
  update: function(){
    
  },
  delete: function(){
    
  },
};
