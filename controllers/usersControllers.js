const path = require("path");
const db = require("../data/db-users");

module.exports = {
  login: function (req, res) {
    res.render("users/login");
  },
  showRegister: function(){

  },
  register: function (req, res) {
    res.render("users/register");
  },
  index: function(){
    
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
