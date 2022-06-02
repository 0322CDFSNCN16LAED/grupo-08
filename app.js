const path = require("path");
const express = require("express");
const app = express();

const mainRouters = require('./routers/main-routes')

const PORT = 3005;

app.listen(PORT, () => {
  console.log("Servidor activo en puerto " + PORT);
});

app.use(express.static(path.join(__dirname, "public")));

app.use('/', mainRouters); 

app.set("view engine", "ejs");

app.use(express.static("public"))