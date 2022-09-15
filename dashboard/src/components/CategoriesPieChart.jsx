import React from 'react';
import { useState, useEffect } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, Grid, Typography }from '@mui/material';

import { EXPRESS_HOST } from '../expressHost';

ChartJS.register(ArcElement, Tooltip, Legend);

const categoriesInfo = [
  {
    id: 1,
    backgroundColor: 'rgb(145, 180, 207)',
    borderColor: '#666',
  },
  {
    id: 2,
    backgroundColor: 'rgb(199, 80, 163)',
    borderColor: '#666',
  },
  {
    id: 3, 
    backgroundColor: 'rgb(252, 230, 83)' ,
    borderColor: '#666',
  },
  {
    id: 4, 
    backgroundColor:'rgb(145, 207, 145)' ,
    borderColor: '#666',
  },
  {
    id: 5,
    backgroundColor: 'rgb(242, 170, 111)',
    borderColor: '#666',
  },
  {
    id: 6,
    backgroundColor: 'rgb(255, 163, 208)',
    borderColor: '#666',
  }
]


export default function CategoriesPieChart() {
    const [list, setList] = useState(null);
  
    useEffect(() => {
      console.log ('%cSe montó comp CategoriesPieChart', 'color: green')
      fetch(`${EXPRESS_HOST}/api/products`)
        .then(response => response.json())
        .then(info => {
          setList (info);        
        })
        .catch(error => console.error (error));    
    }, []);
  
    useEffect(()=> {
      console.log('%cSe actualizó el comp CategoriesPieChart', 'color: yellow');
  }, [list])

  const data = {
    labels: list?  list.datavalue.countByCategory.map((c) => (c.Category.name)): '',
    datasets: [
        {
            data: list?  list.datavalue.countByCategory.map((c) => (c.TotalCategory)): '',
            backgroundColor: categoriesInfo.map((c) => (c.backgroundColor)),
            borderColor: categoriesInfo.map((c) => (c.borderColor)),
            borderWidth: 1,
        },
    ],
};
    return <Grid sx={4}> 
    <Card variant="outlined">
    <Typography variant="h6" component="div" color='#d56b27'>CANTIDAD DE PRODUCTOS POR CATEGORÍA</Typography>
    <Card variant="outlined"> 
    <Pie data={data}/> </Card>
    </Card> </Grid> ; 
}