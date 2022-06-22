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
