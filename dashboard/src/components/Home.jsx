import React from 'react';
import { useState, useEffect } from 'react';

import TotalCard from './TotalCard';
import LastProductRegister from './LastProductRegister';
import LastUserRegister from './LastUserRegister';
import CategoriesPieChart from './CategoriesPieChart';

import { Grid} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import { EXPRESS_HOST } from '../expressHost';

  
export default function Home (){

  //pedido a la api de usuarios para setear el total de usuarios registrados  
  const [totalUsers, setTotalUsers] = useState(0);
  
  async function fetchUsersApi (){
    const response = await fetch(`${EXPRESS_HOST}/api/users`);
    const result = await response.json();
    const totalUsers = result.count;
    setTotalUsers(totalUsers);
  }

  //pedido a la api de productos para setear el total de usuarios registrados  
  const [totalProducts, setTotalProducts] = useState(0);
  
  async function fetchProductssApi (){
    const response = await fetch(`${EXPRESS_HOST}/api/products`);
    const result = await response.json();
    const totalProducts = result.datavalue.count;
    setTotalProducts(totalProducts);
  }
  useEffect(() => {
    console.log ('%cSe montó componente Home', 'color: green');
    fetchUsersApi();
    fetchProductssApi();
  }, []);

  const totalCardsInfo = [
    {
        id: "1", 
        title: "Total de productos en venta",
        value: totalProducts,
        icon: <CardGiftcardIcon/>, 
        text: 'productos en venta'
    },
    {
        id: "2",
        title: "Total de usuarios registrados",
        value: totalUsers,
        icon: <GroupIcon/>,
        text: 'usuarios registrados'
    }
  ];  

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