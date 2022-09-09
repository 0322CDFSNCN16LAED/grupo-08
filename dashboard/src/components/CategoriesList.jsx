import * as React from 'react';

import {categoriesInfo} from '../consts/categoriesInfo';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'; 


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: '#000000'
}));

export default function CategoriesList() {


  return (
    <Box sx={{ width:'20 rem', backgroundColor: '#c44cb4' }}>
<h3 style={{color: 'green'}}>Soy el componente CategoriesList</h3> 
      <Grid sx={{ width:'20 rem', backgroundColor: '#c44cb4' }}>

          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            DECO HOME | Categorías de productos disponibles
          </Typography>
          <Demo>
            <List>
              <Grid container spacing ={2} sx={{ width:'5 rem' , }}>  
              {categoriesInfo.map((cat) => (
                <Grid item xs={12} md={4}> 
                <ListItem
                key={cat.id}
                sx={{}}>
                  <ListItemAvatar>
                    <Avatar> 
                      {cat.icon}
                    </Avatar>
                  </ListItemAvatar>
                <ListItemText sx= {{fontSize: 22 }} secondary={cat.name} /> 
                </ListItem>
                </Grid>

              ))}
              </Grid>
            </List>            
          </Demo>


      </Grid>
    </Box>
  );
}
