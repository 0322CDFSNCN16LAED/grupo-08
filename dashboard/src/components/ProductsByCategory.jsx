/*import React from 'react';
import { useState, useEffect } from 'react';

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { EXPRESS_HOST } from '../expressHost';


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

export default function ProductsByCategory() {

  
  return (
    

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
        {! list ?
        
        <StyledTableRow align="right">
            <StyledTableCell> Cargando...</StyledTableCell>
            </StyledTableRow>    
          : list.datavalue.products.map((product) => (
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
  );
}
*/