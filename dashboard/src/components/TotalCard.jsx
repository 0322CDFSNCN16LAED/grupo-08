import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TotalCard({ title, value, icon, text }) {
  return (
 
    <Box sx={{ width: '20rem' }}>
      <h4 style={{color: 'green'}}>Soy el componente TotalCard</h4> 
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

      <Typography variant="body2" sx={{ fontSize: 16 }}>
        {bull} Actualmente tenemos {value}
        <br />
        {text}
      </Typography>
    </CardContent>
      </Card>
    </Box>
  );
}
