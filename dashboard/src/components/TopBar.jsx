import React from 'react';
import logo from '../logo.png';
import Weather from './Weather';

import {AppBar, Grid} from '@mui/material';

export  default function TopBar (){
    return(
    <AppBar sx={{ flexGrow: 1, height: '10rem', backgroundColor: '#666' }}> 
      <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      >
        <Grid item xs={4} marginLeft='14rem'> 
        <img src={logo} alt="logo" />
        </Grid>
        <Grid item  xs={4} marginRight='2rem' marginTop='1rem'> 
        <Weather/>
        </Grid>
      </Grid>                            
    </AppBar>
    )
}
//  