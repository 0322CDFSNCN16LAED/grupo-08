import React from "react";
import { useState, useEffect } from "react";

/// PROBLEMA : algunos porcentajes dedescuento tienen mas de dos decimales. Queda feo

import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

export default function ProductsList() {
  const [list, setList] = useState(null);

  useEffect(() => {
    console.log("%cSe montó comp ProductsList", "color: green");
    fetch(`${EXPRESS_HOST}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log("%cSe actualizó el comp ProductsList", "color: yellow");
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
        LISTADO DE PRODUCTOS EN VENTA
      </Typography>
      <Table
        sx={{ minWidth: 700, marginTop: "1rem", marginLeft: "1rem" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Descripción</StyledTableCell>
            <StyledTableCell align="center">Categoría</StyledTableCell>
            <StyledTableCell align="center">Ambiente</StyledTableCell>
            <StyledTableCell align="center">Estilo</StyledTableCell>
            <StyledTableCell align="center">Precio de lista</StyledTableCell>
            <StyledTableCell align="center"> % Oferta</StyledTableCell>
            <StyledTableCell align="center">Precio final</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!list ? (
            <StyledTableRow align="right">
              <StyledTableCell> Cargando...</StyledTableCell>
            </StyledTableRow>
          ) : (
            list.datavalue.products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {product.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.category.name}
                </StyledTableCell>
                {product.rooms === "" ? (
                  <StyledTableCell align="center"> Sin datos </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    {product.rooms.map((r) => r.name + " ")}
                  </StyledTableCell>
                )}
                <StyledTableCell align="center">
                  {product.style.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  $ {product.price}
                </StyledTableCell>

                {product.sale < 0.05 ? (
                  <StyledTableCell align="center" color="red">
                    {" "}
                    Sin descuento
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center" sx={{ color: "red" }}>
                    {(product.sale * 100).toFixed(0)} %
                  </StyledTableCell>
                )}
                {product.sale < 0.05 ? (
                  <StyledTableCell align="center">
                    {" "}
                    $ {product.price}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center" sx={{ color: "red" }}>
                    {" "}
                    ${" "}
                    {new Intl.NumberFormat("de-DE").format(
                      product.price * (1 - product.sale)
                    )}
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
