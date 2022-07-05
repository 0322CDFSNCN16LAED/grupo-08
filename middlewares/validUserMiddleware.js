const db = require("../data/db-users");

module.exports = (req, res, next) => {
  const user = db.getOne(req.params.id);

  if (user) {
    next();
  } else {
    res.redirect("/not-found");
  }
};
