import React from 'react';
import { useState, useEffect } from 'react';

import { styled, Card, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material';
import { Collapse, Avatar, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/// PROBLEMA: CÒMO ERA EL TEMA DE LAS IMAGENES Y AS URL ESTATICAS?
// PROBLEMA: FORMATO FECHA CREATEDAT ESTA FEO

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

export default function LastUserRegister() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [last, setLast] = useState(null);

  useEffect(() => {
    console.log ('%cSe montó comp LastUserRegister', 'color: green')
    fetch(`${EXPRESS_HOST}/api/users/lastuserregistered`)
      .then(response => response.json())
      .then(data => {
        setLast (data);        
      })
      .catch(error => console.error (error));    
  }, []);

  useEffect(()=> {
    console.log('%cSe actualizó el comp LastUserRegister', 'color: yellow', {last});
}, [last])

  return (
    <Card sx={{ maxWidth: 345 }}>
      {!last ? <p> Cargando...</p> :
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#d56b27' }} aria-label="recipe">
            P
          </Avatar>
        }
        title="ULTIMO USUARIO REGISTRADO"
        subheader={last.datavalue.createdAt}
      />}
      {!last ? <p> Cargando...</p> :
      <CardMedia
        component="img"
        height="194"
        image={last.datavalue.profilePic}
        alt="Imagen del usuario o producto"
      />}
      <CardContent>
        <Typography variant="h5" >
          {!last ? <p> Cargando...</p> 
          : last.datavalue.email   }
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
          <Typography variant="h6">Información detallada:</Typography>
          <Typography paragraph>
            Nombre :{last.datavalue.name }
            </Typography>
          <Typography paragraph>
            Apellido :{last.datavalue.lastname } 
          </Typography>
          <Typography paragraph>
            Rol de Usuario :  {last.datavalue.userRole.name }
            </Typography>
            <Typography paragraph>
            Teléfono :  {last.datavalue.phoneNumber }
            </Typography>
            {!last.datavalue.address ?
            <Typography paragraph>
            Dirección :  Sin datos
            </Typography>
            :  <Typography paragraph>
            Dirección :  {last.datavalue.address.address}
            </Typography>}
            {!last.datavalue.address ?
            <Typography paragraph>
            Ciudad :  Sin datos
            </Typography>
            :  <Typography paragraph>
            Ciudad :  {last.datavalue.address.city}
            </Typography>}
            {!last.datavalue.address ?
            <Typography paragraph>
            Provincia :  Sin datos
            </Typography>
            :  <Typography paragraph>
            Provincia :  {last.datavalue.address.state}
            </Typography>}
            
            {!last.datavalue.address ?
            <Typography paragraph>
            País :  Sin datos
            </Typography>
            :  <Typography paragraph>
            País :  {last.datavalue.address.country}
            </Typography>}
            {!last.datavalue.address ?
            <Typography paragraph>
            Código Postal :  Sin datos
            </Typography>
            :  <Typography paragraph>
            Código Postal :  {last.datavalue.address.zipcode}
            </Typography>}
        </CardContent>}
      </Collapse>
    </Card>
  );
}
