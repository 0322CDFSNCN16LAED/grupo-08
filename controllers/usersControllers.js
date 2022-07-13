const path = require("path"); // Es necesario este require??
const fs = require("fs"); // Es necesario este require??
const bcryptjs = require("bcryptjs"); //Requerimos el encriptador
const db = require("../data/db-users"); //Requerimos la DB de usuarios

const { validationResult } = require("express-validator");

module.exports = {
  login: function (req, res) {
    // Metodo que muestra el formulario de Login x GET
    res.render("users/login");
  },
  processLogin: function (req, res) {
    // Metodo que procesa el Login x POST
    const resultValidation = validationResult(req);

    if (!resultValidation.isEmpty()) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    let userToLogin = db.getByField("email", req.body.email); // busco al usuario por su mail en la DB
    if (userToLogin) {
      //si existe
      if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
        //comparo la contraseña
        delete userToLogin.password; //por seguridad la borramos
        req.session.userLogged = userToLogin; // creamos la variable en session con el usuario loggeado
        // si el usuario tildó ser recordado:
        if (req.body.recordar) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 }); //dura 1 minuto
        }
        return res.redirect("/users/" + userToLogin.id); //¿va en esta parte + userToLogin.id?
      }
      return res.render("users/login", {
        // Si la password no coincide
        errors: {
          email: {
            msg: "Las credenciales son incorrectas",
          },
        },
      });
    }
    return res.render("users/login", {
      // si el mail no esta en la DB
      errors: {
        email: {
          msg: "El usuario no se encuentra registrado",
        },
      },
    });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  showRegister: function (req, res) {
    //Metodo que muestra el formulario de Registro de usuarios (GET)
    res.render("users/register");
  },
  register: function (req, res) {
    // Metodo que procesar el Registro de usuario nuevo (POST)
    const validationErrors = validationResult(req); // guardo los errores de validacion
    if (!validationErrors.isEmpty()) {
      // SI HAY ERRORES, renderizo el formulario
      res.render("users/register", {
        errors: validationErrors.mapped(), // con los errores mappeados y
        oldData: req.body, // los datos que sí pasaron la validacion
      });
    } else {
      // SI NO HAY ERRORES de validacion
      // busca el usuario por email, si existe
      let userInDB = db.getByField("email", req.body.email);

      if (userInDB) {
        // SI YA HAY UN USUARIO CON ESE MAIL EN LA DB
        res.render("users/register", {
          // renderizamos el formulario
          errors: {
            email: {
              msg: "Este email ya se encuentra registrado", // con este msj de error
            },
          },
          oldData: req.body, // y los datos que sì pasaron la validacion
        });
      } else {
        // SI NO HAY USUARIO CON ESE MAIL EN LA DB - LO GUARDO
        let users = db.getAll(); //traigo todos los usuarios
        const newUser = {
          // guardamos un nuevo usuario con los datos del req
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          telefono: req.body.telefono,
          direccion: req.body.direccion,
          password: bcryptjs.hashSync(req.body.password, 10), // encriptamos la password
          profile: req.file.filename ? req.file.filename : defaultImage.jpg,
        };
        if (users.length) {
          // hacemos un nuevo nro de id de usuaro
          newUser.id = users[users.length - 1].id + 1;
        } else {
          newUser.id = 1;
        }
        users.push(newUser); //pusheamos en el array el nuevo usuario
        db.saveAll(users); // metodo guardar que sobreescribe la db
        res.redirect("/users");
      }
    }
  },
  //vista de todos los usuarios.
  index: function (req, res) {
    let users = db.getAll();
    res.render("users/index", { users: users });
  },
  //ver datalle de cada usuario.
  detail: function (req, res) {
    res.render("../views/users/user-detail", {
      user: db.getOne(req.params.id),
    });
  },
  edit: function (req, res) {
    // Muestra formulario de edicion de usuario
    const userToEdit = db.getOne(req.params.id);
    res.render("users/edit-user", { userToEdit: userToEdit });
  },
  update: (req, res) => {
    res.send("pagina en rehabilitacion");
  },
  /*  update: (req, res) => {
    // Metodo para actualizar info del usuario
    const validationErrors = validationResult(req) // guardo los errores de validacion
    if (!validationErrors.isEmpty()) {
      //Si hay errores los renderizo en el form
      res.render("users/edit", {
        errors: validationErrors.mapped(),
        oldData: req.body,
      });
    } else {

    }

    
    
    
    
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
  } */
};
