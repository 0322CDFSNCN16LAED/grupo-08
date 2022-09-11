import React from 'react';
import { productsInfo } from '../consts/productsInfo';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <h4 style={{color: 'green'}} > Soy el componente ProductsList</h4>

      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Marca</StyledTableCell>
            <StyledTableCell align="right">Categoría</StyledTableCell>
            <StyledTableCell align="right">Ambiente</StyledTableCell>
            <StyledTableCell align="right">Estilo</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
            <StyledTableCell align="right"> % Oferta</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {productsInfo.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="right">{product.brandId}</StyledTableCell>
              <StyledTableCell align="right">{product.categoryId}</StyledTableCell>
              <StyledTableCell align="right">{product.roomId}</StyledTableCell>
              <StyledTableCell align="right">{product.styleId}</StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
              <StyledTableCell align="right">{product.sale}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
