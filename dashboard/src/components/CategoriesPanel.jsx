import React from 'react';
import { useState, useEffect } from 'react';

import {categoriesInfo} from '../consts/categoriesInfo';

import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Avatar, Grid, Typography} from '@mui/material';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { EXPRESS_HOST } from '../expressHost';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: '#000000'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d56b27',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CategoriesPanel() {

  //Hago un estado para guardar de la api/products el listado de categorias, su id, nombre y total de productos asociados 
  // se ejecuta cuando se monte el componente
  const [categories, setCategories] = useState ([]);

  async function fetchCategoriesList (){
    const response = await fetch(`${EXPRESS_HOST}/api/products`);
    const result = await response.json();
    const catInfo = result.datavalue.countByCategory;
    setCategories(catInfo);
  }

  //Hago un estado que guarde la categoria seleccionada por el usuario con el boton
  const [ catSelected, setCatSelected] = useState(null);

  //Hago un estado que guarde el listado de productos por categoria
  const [list, setList] = useState(null);
  
  // pedido a la api del listado con el id seleccionado por el usuario
  async function fetchCategoryDetail(){
    const response = await fetch(`${EXPRESS_HOST}/api/products/category/${catSelected}`);
    const result = await response.json();
    const catDetail = result.data;
    setList(catDetail);
  }

  //se monta el componente, se ejecuta el pedido de listado de categorias
  useEffect(() => {
    console.log ('%cSe montó componente CategoriesPanel', 'color: green');
    fetchCategoriesList();
  }, []);

  // se actualiza el componente, cuando cambia la cat seleccionada por el usuario 
  // y se ejecuta el pedido del listado de productos de esa categoria
  useEffect(() => {
    console.log ('%cSe actualizó componente CategoriesPanel', 'color: green', catSelected);
    fetchCategoryDetail();
  }, [catSelected]);

  return (
   
      <Grid container sx={{ mt: 4, mb: 2, mr:2, ml:2}} >

          <Typography sx={{ mt: 4, mb: 2, mr:2, ml:2 }} variant="h5" component="div">
            DECO HOME | Categorías de productos disponibles
          </Typography>
          <Demo>
            <List>
              <Grid container spacing ={2} sx={{ width:'5 rem' , bgcolor:'#ebebeb' }}>  
              {categories.map((cat) => (
                <Grid item xs={12} md={4}> 
                <ListItem
                key={cat.Category.id}
                sx={{bgcolor:'white'}}>
                  <ListItemButton onClick={()=>setCatSelected(cat.Category.id)}> 
                  <ListItemAvatar>
                    <Avatar sx={{ color: 'white',  bgcolor: '#d56b27' }}> 
                      {cat.TotalCategory}
                    </Avatar>
                  </ListItemAvatar>
                <ListItemText primary={cat.Category.name} sx={{color: 'black'}}/> 

                </ListItemButton> 
                </ListItem>
                </Grid>
              ))}
              {!catSelected ? <p> Cargando </p>  
              : catSelected
              }
              </Grid>
            </List>            
          </Demo>
              {!list ? <h6> Cargando lista...</h6>
              : 
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Categoría</StyledTableCell>
                    <StyledTableCell align="center">Nombre</StyledTableCell>
                    <StyledTableCell align="center">Descripción</StyledTableCell>
                    <StyledTableCell align="center">Marca</StyledTableCell>
                    <StyledTableCell align="center">Estilo</StyledTableCell>
                    <StyledTableCell align="center">Precio de lista</StyledTableCell>
                    <StyledTableCell align="center"> % Oferta</StyledTableCell>
                    <StyledTableCell align="center">Precio final</StyledTableCell>
        
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        {product.categoryId}
                      </StyledTableCell>
                      <StyledTableCell align="center">{product.name}</StyledTableCell>
                      <StyledTableCell align="left">{product.description}</StyledTableCell>
                      <StyledTableCell align="center">{product.brandId}</StyledTableCell>
                      <StyledTableCell align="center">{product.styleId}</StyledTableCell>
                      <StyledTableCell align="center"> $ {product.price}</StyledTableCell>
                      
                      { product.sale < 0.05 ?              
                      <StyledTableCell align="center" color= "red"> Sin descuento</StyledTableCell>
                      : 
                      <StyledTableCell align="center" sx={{color:"red"}}>{product.sale * 100} %</StyledTableCell>
                      }
                      { product.sale < 0.05 ?              
                      <StyledTableCell align="center"> $ {product.price}</StyledTableCell>
                      : 
                      <StyledTableCell align="center" sx={{color:"red"}}> $ {new Intl.NumberFormat('de-DE').format(product.price *(1- product.sale))}</StyledTableCell>
                      }      
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
}

      </Grid>

  )
}
