import React from "react";
import { useState, useEffect } from "react";
import Moment from "moment";

import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Collapse, Avatar, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/// PROBLEMA: CÒMO ERA EL TEMA DE LAS IMAGENES Y LAS URL ESTATICAS? ya esta
/// PROBLEMA: NO ME DEJA COMPARAR SALE CON 0.05, SÍ CON 0...   ya esta
// PROBLEMA: CUANDO TENGA UN PRODUCTO CON ROOMS. COMO IMPRIMO EL ARRAY? MAP? ya esta
// PROBLEMA: FORMATO FECHA CREATEDAT ESTA FEO  ya esta
// PROBLEMA: CONVERTIR FREE DELIVERY DE 0/1 A SI O NO  ya esta

import { EXPRESS_HOST } from "../expressHost";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function LastProductRegister() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [last, setLast] = useState(null);

  useEffect(() => {
    console.log("%cSe montó comp LastProductRegister", "color: green");
    fetch(`${EXPRESS_HOST}/api/products/lastproductregistered`)
      .then((response) => response.json())
      .then((data) => {
        setLast(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log("%cSe actualizó el comp LastProductRegister", "color: yellow", {
      last,
    });
  }, [last]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {!last ? (
        <p> Cargando...</p>
      ) : (
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#d56b27" }} aria-label="recipe">
              P
            </Avatar>
          }
          title="ULTIMO PRODUCTO REGISTRADO"
          subheader={Moment(last.data.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        />
      )}
      {!last ? (
        <p> Cargando...</p>
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={last.data.picture}
          alt="Imagen del usuario o producto"
        />
      )}
      <CardContent>
        <Typography variant="h5">
          {!last ? <p> Cargando...</p> : last.data.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {!last ? (
          <p> Cargando...</p>
        ) : (
          <CardContent>
            <Typography variant="h6">Información detallada:</Typography>
            <Typography paragraph>
              Descripción : {last.data.description}
            </Typography>
            <Typography paragraph>Color : {last.data.colour.name}</Typography>
            <Typography paragraph>
              Medidas : {last.data.measurements}
            </Typography>
            <Typography paragraph>Detalles : {last.data.details}</Typography>
            <Typography paragraph>
              Información Extra : {last.data.extraInfo}
            </Typography>
            <Typography paragraph>
              Envio Gratis : {last.data.freeDelivery == 1 ? "Si" : "No"}
            </Typography>
            <Typography paragraph>
              Precio de Lista $ {last.data.price}
            </Typography>
            {Number(last.data.sale) < 0.05 ? (
              <Typography paragraph>
                Descuento : Sin desc{Number(last.data.sale)}
              </Typography>
            ) : (
              <Typography paragraph sx={{ color: "red" }}>
                Descuento : {last.data.sale * 100} %
              </Typography>
            )}
            {last.data.sale < 0.05 ? (
              <Typography paragraph>Precio Final : Sin desc</Typography>
            ) : (
              <Typography paragraph sx={{ color: "red" }}>
                Precio Final :{" "}
                {(last.data.price * (1 - last.data.sale)).toFixed(2)} %
              </Typography>
            )}
            <Typography paragraph sx={{ color: "green" }}>
              Cuotas : {last.data.installments.name}
            </Typography>
            <Typography paragraph>
              Categoría : {last.data.category.name}
            </Typography>
            <Typography paragraph>Marca : {last.data.brand.name}</Typography>
            <Typography paragraph>Estilo : {last.data.style.name}</Typography>
            {!last.data.rooms ? (
              <Typography paragraph>Ambientes : Sin datos</Typography>
            ) : (
              <Typography paragraph>
                Ambientes : {last.data.rooms.map((r) => r.name + " ")}
              </Typography>
            )}
          </CardContent>
        )}
      </Collapse>
    </Card>
  );
}
