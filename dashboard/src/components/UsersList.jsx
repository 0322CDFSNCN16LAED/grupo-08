import React from "react";
import { useState, useEffect } from "react";
import Moment from "moment";

import { styled, Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { EXPRESS_HOST } from "../expressHost";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d56b27",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [list, setList] = useState(null);

  useEffect(() => {
    console.log("%cSe montó comp UsersList", "color: green");
    fetch(`${EXPRESS_HOST}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log("%cSe actualizó el comp UsersList", "color: yellow");
  }, [list]);

  return (
    <TableContainer component={Paper}>
      <Typography
        sx={{ marginTop: "1rem", marginLeft: "1rem" }}
        variant="h6"
        component="div"
        color="#d56b27"
      >
        {" "}
        LISTADO DE USUARIOS REGISTRADOS
      </Typography>
      <Table
        sx={{
          minWidth: 700,
          marginTop: "1rem",
          marginRight: "1rem",
          marginLeft: "1rem",
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Rol de usuario</StyledTableCell>
            <StyledTableCell align="center">Mail</StyledTableCell>
            <StyledTableCell align="center">Ciudad</StyledTableCell>
            <StyledTableCell align="center">Provincia</StyledTableCell>
            <StyledTableCell align="center">País</StyledTableCell>
            <StyledTableCell align="center">Fecha de registro</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!list ? (
            <StyledTableRow align="right">
              <StyledTableCell> Cargando...</StyledTableCell>
            </StyledTableRow>
          ) : (
            list.datavalue.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="left">{user.lastname}</StyledTableCell>
                <StyledTableCell align="left">
                  {user.userRole.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                {!user.address ? (
                  <StyledTableCell align="center"> Sin datos </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    {" "}
                    {user.address.city}
                  </StyledTableCell>
                )}
                {!user.address ? (
                  <StyledTableCell align="center"> Sin datos </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    {" "}
                    {user.address.state}
                  </StyledTableCell>
                )}
                {!user.address ? (
                  <StyledTableCell align="center"> Sin datos </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    {" "}
                    {user.address.country}
                  </StyledTableCell>
                )}
                {!user.createdAt ? (
                  <StyledTableCell align="center"> Sin datos </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    {" "}
                    {Moment(user.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
