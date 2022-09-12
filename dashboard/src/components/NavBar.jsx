import React from 'react';
import {useRef} from 'react';
import { Link } from 'react-router-dom';

// PROBLEMA: NO ME TOMA EL COLOR Y FONTSIZE DE LA LINEA 50 EL ITEM.


import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { navBarItems } from '../consts/navBarItems';

const drawerWidth = 200;
export default function NavBar (){

  const event = useRef();
    console.log(event)

    return(
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#c44cb4',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {navBarItems.map((item) => (
            <ListItem 
              key={item.id}
              disablePadding>
                <Link to={item.link} ref={event} > 
                <ListItemButton> 
                  <ListItemIcon sx= {{color:'#fafafa'}}> {item.icon} </ListItemIcon>
                  <ListItemText sx= {{color:'#fafafa', fontSize: 16 }} secondary={item.label} /> 
                </ListItemButton>
                </Link>
            </ListItem>
            
          ))}
        </List>
        
      </Drawer>
    )
}