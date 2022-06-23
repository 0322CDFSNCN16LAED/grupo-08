const path = require("path");
const fs = require("fs");
const db = require("../data/db-users");
const users = db.getAll();

module.exports = {
  login: function (req, res) {
    res.render("users/login");
  },
  showRegister: function(req, res){
    res.render('users/register')
  },
  register: function (req, res) {
    const newUser = req.body;
    if (users.length) {
        newUser.id = users[users.length - 1].id + 1;
    } else {
        newUser.id = 1;
    }
    users.push(newUser);

    db.saveAll(users);

    res.redirect("/");
  },
  index: function(req, res){    
    res.render('users/index', {users: users})    
  },
  detail: function(){
    
  },
  edit: function(){
    
  },
  update: function(){
    
  },
  delete: function(){
    
  },
};
