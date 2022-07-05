const path = require("path"); // Es necesario este require??
const fs = require("fs"); // Es necesario este require??
const bcryptjs = require("bcryptjs");
const db = require("../data/db-users");

const { validationResult } = require("express-validator");

module.exports = {
  login: function (req, res) {
    res.render("users/login");
  },
  processLogin: function (req, res) {
    const resultValidation = validationResult(req);

    if (!resultValidation.isEmpty()) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    let userToLogin = db.getByField("email", req.body.email);
    if (userToLogin) {
      if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
        delete userToLogin.password; //por seguridad borramos
        req.session.userLogged = userToLogin;
        return res.redirect("/users/" + userToLogin.id);
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "Las credenciales son incorrectas",
          },
        },
      });
    }
    return res.render("users/login", {
      errors: {
        email: {
          msg: "El usuario no se encuentra registrado",
        },
      },
    });
  },
  showRegister: function (req, res) {
    console.log("en register" + req.session.userLogged);
    res.render("users/register");
  },
  register: function (req, res) {
    const validationErrors = validationResult(req);
    // los mando a la vista register.ejs
    if (!validationErrors.isEmpty()) {
      res.render("users/register", {
        errors: validationErrors.mapped(),
        oldData: req.body,
      });
    } else {
      // busca el usuario por email, si existe
      let userInDB = db.getByField("email", req.body.email);

      if (userInDB) {
        res.render("users/register", {
          errors: {
            email: {
              msg: "Este email ya se encuentra registrado",
            },
          },
          oldData: req.body,
        });
      } else {
        let users = db.getAll();
        const newUser = {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          telefono: req.body.telefono,
          direccion: req.body.direccion,
          password: bcryptjs.hashSync(req.body.password, 10),
        };
        if (users.length) {
          newUser.id = users[users.length - 1].id + 1;
        } else {
          newUser.id = 1;
        }
        users.push(newUser);
        db.saveAll(users);
        res.redirect("/users");
      }
    }
  },
  //vista de todos los usuarios.
  index: function (req, res) {
    //console.log(req.session);
    let users = db.getAll();
    res.render("users/index", { users: users });
  },
  //ver datalle de cada usuario.
  detail: function (req, res) {
    //console.log("en detail " + req.session);
    res.render("../views/users/user-detail", {
      user: db.getOne(req.params.id),
    });
  },
  edit: function (req, res) {
    const userToEdit = db.getOne(req.params.id);
    res.render("users/edit-user", { userToEdit: userToEdit });
  },
  update: function () {},
  delete: function () {},
};
