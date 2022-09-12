import React from 'react';
import { useState, useEffect } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Box from '@mui/material/Box';

import { categoriesInfo } from '../consts/categoriesInfo'

const EXPRESS_HOST = "http://localhost:3005";

ChartJS.register(ArcElement, Tooltip, Legend);



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
    return <Box sx={{ width: '25rem'}}> 
    <h3 style={{color: 'green'}}>Soy el componente CategoriesPieChart</h3> 
    <Pie data={data}/> </Box>;
}