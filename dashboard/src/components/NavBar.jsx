import React from 'react';
import {useRef} from 'react';
import { Link } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { navBarItems } from '../consts/navBarItems';

const drawerWidth = 240;
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
                <Link to={item.link} exact='true' ref={event} > 
                <ListItemButton> 
                  <ListItemIcon> {item.icon} </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
                </Link>
            </ListItem>
            
          ))}
        </List>
        
      </Drawer>
    )
}