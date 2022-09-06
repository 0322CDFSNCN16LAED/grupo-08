const { name } = require("ejs");
const db = require("../../database/models");

/* ○ Deberá devolver un objeto literal con la siguiente estructura:
■ count → cantidad total de usuarios en la base.
■ users → array con la colección de usuarios, cada uno con:
    ● id
    ● name
    ● email
    ● detail → URL para obtener el detalle. */

const usersApiController = {
  list: async (req, res) => {
    const { rows, count } = await db.User.findAndCountAll({
      attributes: ["id", "name", "email"],
    });
    
    res.status(200).json({
      cantidadUsers: count,
      users: rows,

    });
  },

  //   api/users/:id
  // ○ Deberá devolver un objeto literal
  //   con la siguiente estructura:
  // ■ Una propiedad por cada campo en base.
  // ■ Una URL para la imagen de perfil (para mostrar la imagen).
  // ■ Sin información sensible (ej: password y categoría).

  //

  detail: async function (req, res) {
    let user = await db.User.findByPk(
      req.params.id,
      {
        attributes: { exclude: ["password", "UserRoleId", "userRoleId"] },
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send({ user: user });
  },
};

module.exports = usersApiController;
