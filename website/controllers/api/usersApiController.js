const db = require("../../database/models");

const usersApiController = {
  list: async (req, res) => {
    const limit = 5;
    const offset = req.query.page ?? 0;
    try {
      const { rows, count } = await db.User.findAndCountAll({
        limit: 5,
        offset: offset * limit,
        attributes: ["id", "name", "email"],
      });

      res.status(200).json({
        count: count,
        rows: rows.map((obj) => ({
          id: obj.id,
          name: obj.name,
          email: obj.name,
          urlDetail: `http://localhost:3005/api/users/${obj.id}`,
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        url: `http://localhost:3005${req.originalUrl}`,
        error: error,
      });
    }
  },

  /* 
  lastUserRegistered: async (req, res) => {
    let lastUser = await db.User.findOne({
      attributes: ["name", "id"],
      having: Math.min("createdAt"),
    });
    console.log(lastUser);
    res.send({ user: lastUser });
  },
  */

  detail: async function (req, res) {
    try {
      let user = await db.User.findByPk(
        req.params.id,
        {
          attributes: { exclude: ["password", "UserRoleId", "userRoleId"] },
        },
        {
          where: { id: req.params.id },
        }
      );

      (user.profileDetail = `http://localhost:3005${user.profilePic}`),
        res.status(200).json([{ user: user, urlPic: user.profileDetail }]);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        url: `http://localhost:3005${req.originalUrl}`,
        error: error,
      });
    }
  },
};

module.exports = usersApiController;
