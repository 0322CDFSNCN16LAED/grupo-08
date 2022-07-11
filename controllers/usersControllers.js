const path = require("path"); // Es necesario este require??
const fs = require("fs"); // Es necesario este require??
const db = require("../data/db-users");
const users = db.getAll();
const user = db.getOne();
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');


module.exports = {
  login: function (req, res) {
    res.render("users/login");
  },
  showRegister: function(req, res){
    res.render('users/register')
  },
  register: function (req, res) {
    // traigo los errores de validacion al controlador
    const validationErrors = validationResult(req);
    // los mando a la vista register.ejs
    if(!validationErrors.isEmpty()) { // si hay errores
      res.render ('users/register', {  // volvemos a la vista de registro 
        errors : validationErrors.mapped(), //mandando a dicha vista los errores mapeados
        oldData:req.body, // y los datos viejos que pasaron a validacion
      })
    } else { // si no hay errores se guarda el usuario nuevo

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
    res.redirect("/");}
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
  update: (req, res) => {
    const userIndex = users.findIndex((u) => u.id == req.params.id);

    const user = users[userIndex];
    
      user.nombre = req.body.nombre;
      user.apellido = req.body.apellido;
      user.email = req.body.email;
      user.telefono = req.body.telefono;
      user.password = req.body.password;
      user.direccion = req.body.direccion;
    
    if (req.file) {
      edicion.profile = "/images/usersProfiles/" + req.file.filename;
    } else {
      edicion.profile = usuarioViejo.profile;
    };


      res.redirect("users/index")
  },
  delete: function(){
    
  },
};
