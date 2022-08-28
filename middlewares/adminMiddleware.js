module.exports = async (req, res, next) => {
  if ( req.session.userLogged.userRole.name == 'admin') {
        next()
      } else {
        res.redirect("/not-found");
    }
};