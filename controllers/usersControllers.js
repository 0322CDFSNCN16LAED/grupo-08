const bcryptjs = require("bcryptjs"); //Requerimos el encriptador
const database = require("../database/models"); //Requerimos la DB de Sequelize

const { validationResult } = require("express-validator");

module.exports = {
  login: function (req, res) {
    // Metodo que muestra el formulario de Login x GET
    res.render("users/login");
  },

  processLogin: async function (req, res) {
    // Metodo que procesa el Login x POST
    const resultValidation = validationResult(req);

    if (!resultValidation.isEmpty()) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    let userToLogin = await database.User.findOne({
      // busco al usuario por su mail en la DB
      where: {
        email: req.body.email,
      },
      include: ["userRole"],
    });
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
    let userRoles = await database.UserRole.findAll({
      where: { name: "user" },
    });
    let addresses = await database.Address.findAll();
    return res.render("users/register", { userRoles, addresses });
  },

  // Metodo que procesar el Registro de usuario nuevo (POST)
  register: async function (req, res) {
    let users = await database.User.findAll(); //traigo la tabla de users
    let userRoles = await database.UserRole.findAll(); //traigo la tabla  de userRoles
    let addresses = await database.Address.findAll(); //traigo la tabla de direcciones

    const validationErrors = validationResult(req); // guardo los errores de validacion

    if (!validationErrors.isEmpty()) {
      // SI HAY ERRORES,
      res.render("users/register", {
        //renderizo el formulario
        errors: validationErrors.mapped(), // con los errores mappeados y
        oldData: req.body, // los datos que sí pasaron la validacion
        users,
        userRoles,
        addresses,
      });
    } else {
      // SI NO HAY ERRORES de validacion
      // busca el usuario por email, si existe
      let userInDB = await database.User.findOne({
        where: {
          email: req.body.email,
        },
      });
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
          userInDB,
          userRoles,
          addresses,
        });
      } else {
        // SI NO HAY USUARIO CON ESE MAIL EN LA DB - LO GUARDO
        await database.User.create(
          {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: bcryptjs.hashSync(req.body.password, 10),
            profilePic: req.file ? req.file.filename : "defaultImage.jpg",
            userRoleId: req.body.userRoleId,
            address: {
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              country: req.body.country,
              zipCode: req.body.zipCode,
            },
          },
          {
            include: [
              {
                association: "address",
              },
            ],
          }
        );
        res.redirect("/"); //finalmente, redirecciono al home.
      }
    }
  },

  //READ - listar todos los usuarios
  index: async function (req, res) {
    let addresses = await database.Address.findAll(); //traigo la tabla de direcciones
    let users = await database.User.findAll({
      include: ["userRole", "address"],
    });
    res.render("users/index", { users, addresses });
  },

  // detalle de user
  detail: async function (req, res) {
    let address = await database.Address.findAll(); //traigo la tabla de direcciones
    let user = await database.User.findByPk(req.params.id, {
      include: ["userRole", "address"],
    });
    res.render("../views/users/user-detail", { user, address });
  },

  // formulario de edicion de un user
  edit: async function (req, res) {
    let userRoles = await database.UserRole.findAll(); //traigo la tabla  de userRoles
    let userToEdit = await database.User.findByPk(req.params.id, {
      include: ["userRole", "address"],
    });
    res.render("users/edit-user", { userToEdit, userRoles });
  },

  //se procesa la edición de un usuario
  update: async function (req, res) {
    let userRoles = await database.UserRole.findAll();
    console.log("esat entrando por acaaaaaa");
    const validationErrors = validationResult(req);
    console.log("las validaciones " + validationErrors);
    //capturo el registro a modificar
    let user = await database.User.findByPk(req.params.id, {
      include: ["userRole", "address"],
    });
    // verifico
    if (!validationErrors.isEmpty()) {
      console.log("************************* las validaciones del back");
      const voldData = {
        ...req.body,
        id: req.params.id,
        profilePic: "defaultImage.jpg",
      };
      console.log(voldData);
      res.render("users/edit-user", {
        //renderizo el formulario
        errors: validationErrors.mapped(), // con los errores mappeados y
        oldData: voldData, // los datos que sí pasaron la validacion
        userRoles,
      });
    } else {
      // si no hay errores
      try {
        await database.User.update(
          {
            // Actualizo al usuario con el metodo UPDATE de Sequelize
            name: req.body.name,
            lastname: req.body.lastname,
            //email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: bcryptjs.hashSync(req.body.password, 10),
            profilePic: req.file ? req.file.filename : "defaultImage.jpg",
            userRoleId: req.body.userRoleId,
          },
          {
            where: { id: user.id },
          }
        );
        database.Address.update(
          {
            //luego guardo el id en  la nueva dirección
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipCode: req.body.zipCode,
          },
          {
            where: { userId: user.id },
          }
        );
        user = await database.User.findByPk(req.params.id, {
          include: ["userRole", "address"],
        });
        console.log("lo que acabo de actualizar");
        res.render("users/user-detail", { user });
      } catch (error) {
        res.send(error);
      }
    }
  },

  // Borrado de un usuario
  delete: async function (req, res) {
    let userId = req.params.id;
    try {
      let userToDelete = await database.User.findByPk(userId, {
        include: ["address"],
      });
      if (userToDelete) {
        await userToDelete.destroy();
        await database.Address.destroy({
          where: { userId: userToDelete.id },
        });
        res.redirect("/");
      }
    } catch (error) {
      console.error(error);
    }
  },
};
