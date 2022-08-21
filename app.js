const path = require("path");
const express = require("express");
const methodOverride = require("method-override"); // Permite usar metodos HTTP PUT & DELETE
const session = require("express-session");
const cookies = require("cookie-parser");
const mainRouters = require("./routers/main-router");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const app = express();

app.set("view engine", "ejs"); // Motor de plantillas EJS
app.set("views", path.join(__dirname, "/views"));

app.use(
  // configuramos session a nivel aplicacion
  session({
    secret: "ABHYTGSTIIIHJmngstrahsoriruhfgIJUGASGATjhgasaaj",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookies());

app.use(userLoggedMiddleware); // MW a nivel aplicacion con los datos del usuario que pidio ser recordado

app.use(express.static(path.join(__dirname, "public"))); // Hace estatica carpeta public

app.use(express.urlencoded({ extended: false })); //permite capturar informacion que viene de formularios
app.use(express.json()); // permite convertir la info en formato json

app.use(methodOverride("_method")); // Permite usar metodos HTTP PUT & DELETE
app.use("/", mainRouters);

const PORT = 3006;
app.listen(PORT, () => {
  console.log("Servidor activo en puerto " + PORT);
});

app.use((req, res, next) => {
  // para  mostrar errores cuando la ruta no funcione.
  res.status(404).render("not-found");
});
