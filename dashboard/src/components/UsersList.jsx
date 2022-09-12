import React from 'react';
import { useState, useEffect } from 'react';

import { styled, Paper } from '@mui/material';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead,TableRow} from '@mui/material';

const EXPRESS_HOST = "http://localhost:3005";

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

    const [list, setList] = useState(null);
  
    useEffect(() => {
      console.log ('%cSe montó comp UsersList', 'color: green')
      fetch(`${EXPRESS_HOST}/api/users`)
        .then(response => response.json())
        .then(data => {
          setList (data);            
        })
        .catch(error => console.error (error));    
    }, []);
  
    useEffect(()=> {
      console.log('%cSe actualizó el comp UsersList', 'color: yellow');
  }, [list])

  return (
    
    <TableContainer component={Paper}>
      <h4 style={{color: 'green'}} > Soy el componente UsersList</h4>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Rol de usuario</StyledTableCell>
            <StyledTableCell align="center">Mail</StyledTableCell>
            <StyledTableCell align="center">Ciudad</StyledTableCell>
            <StyledTableCell align="center">País</StyledTableCell>
            <StyledTableCell align="center">Fecha de registro</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {! list ?
        
        <StyledTableRow align="right">
            <StyledTableCell> Cargando...</StyledTableCell>
            </StyledTableRow>       
            
        : list.rows.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="left">{user.lastname}</StyledTableCell>
              <StyledTableCell align="left">{user.userRole.name}</StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              {!user.address ? 'Sin  datos':
              <StyledTableCell align="center"> {user.address.country}  </StyledTableCell>}
              {!user.address ? '' :
              <StyledTableCell align="center">{user.address.city}</StyledTableCell>}
              <StyledTableCell align="center">{user.createdAt}</StyledTableCell>

              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
