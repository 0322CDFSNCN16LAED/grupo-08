const path = require("path");
const express = require("express");
const app = express();

const mainRouters = require('./routers/main-routes')
const mainController = require('./controllers/mainControllers')

const PORT = 3005;

app.listen(PORT, () => {
  console.log("Servidor activo en puerto " + PORT);
});

app.use(express.static(path.join(__dirname, "public")));

app.use('/', mainRouters); 


/*
app.get("/", (req, res) => {
  //funcion controladora
  res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/carritocompras", (req, res) => {
  res.sendFile(path.join(__dirname, "views/carritocompras.html"));
});

app.get("/producto", (req, res) => {
  res.sendFile(path.join(__dirname, "views/producto.html"));
});
app.get("/producto-lamp", (req, res) => {
  res.sendFile(path.join(__dirname, "views/producto-lamp.html"));
});
app.get("/producto-silla", (req, res) => {
  res.sendFile(path.join(__dirname, "views/producto-silla.html"));
});
app.get("/catalogo", (req, res) => {
  res.sendFile(path.join(__dirname, "views/catalogo.html"));
});
app.get("/catalogo2", (req, res) => {
  res.sendFile(path.join(__dirname, "views/catalogo2.html"));
});
app.get("/pago", (req, res) => {
  res.sendFile(path.join(__dirname, "views/pago.html"));
});
*/