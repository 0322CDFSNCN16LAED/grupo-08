import React from 'react';  // PROBLEMA :¿ por que me pide importar react en cada componente pedorro?

import GroupIcon from '@mui/icons-material/Group';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const totalCardsInfo = [
  {
      id: "1", 
      title: "Total de productos en venta",
      value: "5236",// me gustaria hacer aca el pedido a la api
      icon: <CardGiftcardIcon/>, 
      text: 'productos en venta'
  },
  {
      id: "2",
      title: "Total de usuarios registrados",
      value: "739",
      icon: <GroupIcon/>,
      text: 'usuarios registrados'
  }
];  