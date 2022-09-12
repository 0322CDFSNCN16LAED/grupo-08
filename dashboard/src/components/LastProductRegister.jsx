import React from 'react';
import { useState, useEffect } from 'react';

import { styled, Card, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material';
import { Collapse, Avatar, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/// PROBLEMA: CÒMO ERA EL TEMA DE LAS IMAGENES Y AS URL ESTATICAS?
// PROBLEMA: CUANDO TENGA UN PRODUCTO CON ROOMS. COMO IMPRIMO EL ARRAY? MAP?
// PROBLEMA: FORMATO FECHA CREATEDAT ESTA FEO
// PROBLEMA: CONVERTIR FREE DELIVERY DE 0/1 A SI O NO

const EXPRESS_HOST = "http://localhost:3005";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
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
    console.log ('%cSe montó comp LastRegister', 'color: green')
    fetch(`${EXPRESS_HOST}/api/products/lastproductregistered`)
      .then(response => response.json())
      .then(data => {
        setLast (data);        
      })
      .catch(error => console.error (error));    
  }, []);

  useEffect(()=> {
    console.log('%cSe actualizó el comp LastRegister', 'color: yellow', {last});
}, [last])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <h3 style={{color: 'green'}}>Soy el componente Last Register</h3> 
      {!last ? <p> Cargando...</p> :
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#d56b27' }} aria-label="recipe">
            P
          </Avatar>
        }
        title="ULTIMO PRODUCTO REGISTRADO"
        subheader={last.data.createdAt}
      />}
      {!last ? <p> Cargando...</p> :
      <CardMedia
        component="img"
        height="194"
        image={last.data.picture}
        alt="Imagen del usuario o producto"
      />}
      <CardContent>
        <Typography variant="body1" >
          {!last ? <p> Cargando...</p> 
          : last.data.name          }
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
          {!last ? <p> Cargando...</p> :        
          <CardContent>
          <Typography paragraph>Información detallada:</Typography>
          <Typography paragraph>
            Descripción :{last.data.description }
            </Typography>
          <Typography paragraph>
            Color :{last.data.colour.name } 
          </Typography>
          <Typography paragraph>
            Medidas :   {last.data.meassurements }
            </Typography>
            <Typography paragraph>
            Detalles :   {last.data.details }
            </Typography>
            <Typography paragraph>
            Información Extra :   {last.data.extraInfo }
            </Typography>
            <Typography paragraph>
            Envio Gratis :   {last.data.freeDelivery }
            </Typography>
          <Typography paragraph>
            Precio  $  {last.data.price }
            </Typography>
          <Typography paragraph sx={{color: 'red'}}>
            Descuento    : {last.data.sale *100} %  
            </Typography>
            <Typography paragraph sx={{color: 'green'}}>
            Cuotas    : {last.data.installments.name}  
            </Typography>
            <Typography paragraph>
            Categoría :   {last.data.category.name }
            </Typography>
            <Typography paragraph>
            Marca :   {last.data.brand.name }
            </Typography>
            <Typography paragraph>
            Estilo :   {last.data.style.name }
            </Typography>
            
        </CardContent>}
      </Collapse>
    </Card>
  );
}
