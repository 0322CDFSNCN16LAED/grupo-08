import React from 'react';

import TotalCard from './TotalCard';
import {totalCardsInfo} from '../consts/totalCardsInfo';
import LastProductRegister from './LastProductRegister';
import LastUserRegister from './LastUserRegister';
import CategoriesPieChart from './CategoriesPieChart';

import { Grid} from '@mui/material';


export default function Home (){
    return (
    <Grid container>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        marginTop='1rem'
        marginLeft='1rem'
      >

      <Grid item xs={3}> 
        <LastProductRegister/>
      </Grid>      
      <Grid item xs={3} > 
        <LastUserRegister/>
      </Grid>    
      </Grid>


      <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-end"
      spacing={2}
    >

      <Grid item xs={4} >
        {totalCardsInfo.map((data) => {
          return <TotalCard {...data} key={data.id} />;
          })}         
      </Grid>
      <Grid item xs={4} >
        <CategoriesPieChart/>
      </Grid>      
      </Grid>

      </Grid>
  )
}