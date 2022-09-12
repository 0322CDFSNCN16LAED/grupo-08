const db = require("../../database/models");

const usersApiController = {
  list: async (req, res) => {
    const limite = 20;
    const offset = req.query.page ?? 0;
    try {
      const { rows, count } = await db.User.findAndCountAll({
        limit: limite,
        offset: offset * limite,
        attributes: ["id", "name", "lastname", "email", "createdAt"],
      });

      res.status(200).json({
        count: count,
        datavalue: rows.map((obj) => ({
          id: obj.id,
          name: obj.name,
          lastname: obj.lastname,
          email: obj.email,
          createdAt: obj.createdAt,
          urlDetail: `http://localhost:3005/api/users/${obj.id}`,
        })),
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        url: `http://localhost:3005${req.originalUrl}`,
        error: error,
      });
    }
  },
  lastUserRegistered: async (req, res) => {
    try {
      let lastUser = await db.User.findAll({
        limit: 1,
        attributes: ["id", "name", "lastname", "email", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
      lastUser[0].urlDetail = `http://localhost:3005/api/users/${lastUser[0].id}`;
      res.status(200).json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        datavalue: {
          id: lastUser[0].id,
          name: lastUser[0].name,
          lastname: lastUser[0].lastname,
          email: lastUser[0].email,
          createdAt: lastUser[0].createdAt,
          urlDetail: lastUser[0].urlDetail,
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          url: req.originalUrl,
          errorName: error.name,
          errorMsg: error.msg,
        },
      });
    }
  },
  detail: async function (req, res) {
    try {
      let user = await db.User.findByPk(req.params.id, {
        attributes: {
          exclude: [
            "password",
            "UserRoleId",
            "userRoleId",
            "deletedAt",
            "updatedAt",
          ],
        },
      });
      user.profilePic = `http://localhost:3005/images/usersProfiles/${user.profilePic}`;
      res.status(200).json({
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        datavalue: user,
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
};

module.exports = usersApiController;
