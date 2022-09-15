import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'; 

import {useRef} from 'react';

import {categoriesInfo} from '../consts/categoriesInfo';

import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, Grid, Typography} from '@mui/material';
import ProductsByCategory from './ProductsByCategory';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: '#000000'
}));

export default function CategoriesPanel() {
  const event = useRef();
    console.log(event)

  return (
   
      <Grid container sx={{ mt: 4, mb: 2, mr:2, ml:2}} >

          <Typography sx={{ mt: 4, mb: 2, mr:2, ml:2 }} variant="h5" component="div">
            DECO HOME | Categorías de productos disponibles
          </Typography>
          <Demo>
            <List>
              <Grid container spacing ={2} sx={{ width:'5 rem' , bgcolor:'#ebebeb' }}>  
              {categoriesInfo.map((cat) => (
                <Grid item xs={12} md={4}> 
                <ListItem
                key={cat.id}
                sx={{bgcolor:'white'}}>
                  <Link to={cat.link}>  
                  <ListItemButton> 
                  <ListItemAvatar>
                    <Avatar sx={{ color: 'white',  bgcolor: '#d56b27' }}> 
                      {cat.icon}
                    </Avatar>
                  </ListItemAvatar>
                <ListItemText primary={cat.name} sx={{color: 'black'}}/> 
                </ListItemButton> 

                </Link>
                </ListItem>
                </Grid>

              ))}
              </Grid>
            </List>            
          </Demo>

<Switch> 
        <Route path='/categories/muebles' exact= {true} component={ProductsByCategory}/> 
</Switch>
      </Grid>

  );
}
