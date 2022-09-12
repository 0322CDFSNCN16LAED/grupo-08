import React from 'react';
import logo from '../logo.png';
import Weather from './Weather';

import {AppBar, Card, Grid} from '@mui/material';

export  default function TopBar (){
    return(
        <AppBar sx={{ flexGrow: 1, backgroundColor: '#ebebeb', }}> 
<Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="baseline"
>
            <Card sx={{ alignSelf: 'flex-start',marginLeft: '16rem', marginTop:'1rem'}}> 
                <img src={logo} alt="logo" />
            </Card>
            <Card sx={{  alignSelf: 'flex-end' }}> 
              <Weather/>
            </Card></Grid>                            
        </AppBar>

    )
}
//  