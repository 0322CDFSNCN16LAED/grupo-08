import * as React from 'react';

import {categoriesInfo} from '../consts/categoriesInfo';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: '#000000'
}));

export default function CategoriesList() {


  return (
    <Box sx={{ width:'20 rem', backgroundColor: '#c44cb4' }}>

      <Grid sx={{ width:'20 rem', backgroundColor: '#c44cb4' }}>

          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            DECO HOME | Categorías de productos disponibles
          </Typography>
          <Demo>
            <List>
              <Grid container spacing ={2} sx={{ width:'5 rem' , backgroundColor: '#FF0000'}}>  
              {categoriesInfo.map((cat) => (
                <Grid item xs={12} md={4}> 
                <ListItem
                key={cat.id}
                sx={{backgroundColor:'#000000'}}>
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
