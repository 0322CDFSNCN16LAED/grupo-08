import React from 'react';
import { useState, useEffect } from 'react';
import {Box, Card, CardContent, Typography, Avatar} from '@mui/material';

const EXPRESS_HOST = "http://localhost:3005";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function TotalCard ({ title, value, icon, text }) {

  const [total, setTotal] = useState(null);
  
  useEffect(() => {
    console.log ('%cSe montó comp TotalCard', 'color: green')
    fetch(`${EXPRESS_HOST}/api/users`)
      .then(response => response.json())
      .then(data => {
        setTotal (data);
      })
      .catch(error => console.error (error));    
  }, []);

  useEffect(()=> {
    console.log('%cSe actualizó el comp TotalCard', 'color: yellow');
}, [total])

  return (
 
    <Box sx={{ width: '20rem' }}>
      <h4 style={{color: 'green'}}>Soy el componente TotalCard </h4> 
      <Card variant="outlined">
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {bull} DECO HOME {bull}

        
      </Typography>
      <Box>
        <Typography variant="h6" component="div" color='#d56b27'>
        {title}
        </Typography>
        <Avatar sx={{ bgcolor: '#d56b27' }} aria-label="recipe">
        {icon}
        </Avatar>
      </Box>
        {total ?
        total.count
        : <p> Cargando...</p> }
      <Typography variant="body2" sx={{ fontSize: 16 }}>
        {bull} Actualmente tenemos  
        <br />
        {text}
      </Typography>
    </CardContent>
      </Card>
    </Box>
  );
}
