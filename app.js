const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method")); // para poder sobreescribir metodos put delete

const mainRouters = require("./routers/main-router");
app.use("/", mainRouters);

const PORT = 3005;
app.listen(PORT, () => {
  console.log("Servidor activo en puerto " + PORT);
});

// para  mostrar errores cuando la ruta no funcione.
app.use((req, res, next) => {
  res.status(404).render("not-found");
});
