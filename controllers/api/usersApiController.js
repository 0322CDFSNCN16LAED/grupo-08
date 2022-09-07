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
    limit = 5;
    offset = 0;
    const { rows, count } = await db.User.findAndCountAll({
      attributes: ["id", "name", "email"],
    }).catch((error) => console.log(error));

    res.status(200).json({
      count: count,
      rows: rows.map((obj) => ({
        id: obj.id,
        name: obj.name,
        email: obj.name,
        urlDetail: `http://localhost:3005/api/users/${obj.id}`,
      })),
    });
  },

  lastUserRegistered: async (req, res) => {
    let lastUser = await db.User.findOne({
      attributes: ["name", "id"],
      having: Math.min("createdAt"),
    });
    console.log(lastUser);
    res.send({ user: lastUser });
  },

  //   api/users/:id
  // ○ Deberá devolver un objeto literal
  //   con la siguiente estructura:
  // ■ Una propiedad por cada campo en base.
  // ■ Una URL para la imagen de perfil (para mostrar la imagen).
  // ■ Sin información sensible (ej: password y categoría).

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

    (user.profileDetail = `http://localhost:3005/images/usersProfiles/${user.profilePic}`),
      res.status(200).json([{ user: user, urlPic: user.profileDetail }]);
  },
};

module.exports = usersApiController;
