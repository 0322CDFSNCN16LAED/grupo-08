import React from 'react';
import {useRef} from 'react';
import { Link } from 'react-router-dom';

import {categoriesInfo} from '../consts/categoriesInfo';

import { styled } from '@mui/material/styles';
import {Box, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, Grid, Typography} from '@mui/material';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: '#000000'
}));

export default function CategoriesPanel() {
  const event = useRef();
    console.log(event)

  return (
    <Box sx={{ width:'20 rem', backgroundColor: '#c44cb4' }}>
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
                  <Link to={cat.link}>  
                  <ListItemButton> 
                  <ListItemAvatar>
                    <Avatar> 
                      {cat.icon}
                    </Avatar>
                  </ListItemAvatar>
                <ListItemText sx= {{fontSize: 22 }} secondary={cat.name} /> 
                </ListItemButton> 

                </Link>
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
