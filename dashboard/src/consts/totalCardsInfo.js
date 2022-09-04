import React from 'react';  // PROBLEMA : por que me pide importar react en cada componente pedorro?

import GroupIcon from '@mui/icons-material/Group';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const totalCardsInfo = [
  {
      id: "1", // id para que?
      title: "Total de productos en venta",
      value: "5236",
      icon: <CardGiftcardIcon/>
  },
  {
      id: "2",
      title: "Total de usuarios registrados",
      value: "739",
      icon: <GroupIcon/>,
  }
];  