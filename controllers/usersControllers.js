const bcryptjs = require("bcryptjs"); //Requerimos el encriptador
const db = require("../data/db-users")//DBJSON
const database = require("../database/models"); //Requerimos la DB de Sequelize

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

  //CRUD DE USUARIOS
    //Metodo que muestra el formulario de Registro de usuarios (GET)
  showRegister: async function (req, res) {
    let userRoles = await database.UserRole.findAll({raw:true, nest: true});
      return res.render("users/register", {userRoles});
  },
  // Metodo que procesar el Registro de usuario nuevo (POST)
  register: async function (req, res) {
    let userRoles = await database.UserRole.findAll({raw:true, nest: true});//traigo el modelo de userRoles
    
    const validationErrors = validationResult(req); // guardo los errores de validacion
    if (!validationErrors.isEmpty()) {
      // SI HAY ERRORES, renderizo el formulario
      res.render("users/register" , {
        errors: validationErrors.mapped(), // con los errores mappeados y
        oldData: req.body, // los datos que sí pasaron la validacion
        userRoles
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
          userRoles
        });
      } else {
        
        // SI NO HAY USUARIO CON ESE MAIL EN LA DB - LO GUARDO
        let newAddress = await database.Address.create ({//primero guardando su dirección
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          zipCode: req.body.zipCode,
        })

      database.User.create({ // y luego usando el metodo CREATE de Sequelize
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            addressId: newAddress.dataValues.id,
            password: bcryptjs.hashSync(req.body.password, 10), 
            profilePic:req.file ? req.file.filename : "defaultImage.jpg",
            userRoleId: req.body.userRoleId,
            
      })
        console.log(req.body)
        res.redirect("/"); //finalmente, redirecciono al home.
      }
    }
  },
  //READ - listar todos los usuarios
  index: async function (req, res){
    try {
    let userRoles = await database.UserRole.findAll({raw:true, nest: true});//traigo el modelo de userRoles
    let address = await database.Address.findAll({raw:true, nest: true});
    let orders = await database.Orders.findAll({raw:true, nest: true});
    let users = await database.User.findAll({
      include: ['userRoles', 'address', 'orders']
    })} catch (error){
      console.error(error)
  } res.render("../views/users/user-detail", {users})
    console.log(users)
  },
   
  
  // detalle de user
  detail: async function (req, res) {
    let userRoles = await database.UserRole.findAll({raw:true, nest: true});//traigo el modelo de userRoles
    let address = await database.Address.findAll();
    let orders = await database.Orders.findAll();
    let user = await database.User.findByPK(req.params.id, {
      include: ['userRoles', 'address', 'orders']
    })
    res.render("../views/users/user-detail", {user})
    console.log(user)
  }
    


  //create user CRUD metodo JSON 
  // SI NO HAY USUARIO CON ESE MAIL EN LA DB - LO GUARDO

/*  let users = db.getAll(); //traigo todos los usuarios
  const newUser = {
    // guardamos un nuevo usuario con los datos del req
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,
    password: bcryptjs.hashSync(req.body.password, 10), // encriptamos la password
    profile: req.file ? req.file.filename : "defaultImage.jpg",
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
  //ver datalle de cada usuario 
 /* detail: function (req, res) {
    res.render("../views/users/user-detail", {
      user: db.getOne(req.params.id),
    });
  }*/,
  edit: function (req, res) {
    // Muestra formulario de edicion de usuario
    const userToEdit = db.getOne(req.params.id);
    res.render("users/edit-user", { userToEdit: userToEdit });
  },
  //actualiza los usuarios
  update: function (req, res) {
    let users = db.getAll();
    const usersIndex = users.findIndex(
      (usuario) => usuario.id == req.params.id
    );
    const user = users[usersIndex];
    // armo el objeto a modificar
    const editUser = {
      id: user.id,
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
      password: req.body.password
        ? bcryptjs.hashSync(req.body.password, 10)
        : user.password,
      profilePic: req.file ? req.file.filename : user.profilePic,
    };

    users[usersIndex] = editUser;
    db.saveAll(users);
    res.redirect("/users");
  },
  delete: function (req, res) {
    let users = db.getAll(); // sirve para que agarre los elementos del usuario para depsues se pueda actualizar los usuarios eliminados
    const filterUsers = users.filter((usuario) => {
      return usuario.id != req.params.id;
    });

    db.saveAll(filterUsers);
    res.redirect("/users");
  },
};
