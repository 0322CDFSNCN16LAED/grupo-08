import React from 'react';

import TotalCard from './TotalCards';
import {totalCardsInfo} from '../consts/totalCardsInfo';
import LastRegister from './LastRegister';
import CategoriesPanel from './CategoriesPanel';
/// PROBLEMA: NO TOMA ROW PARA PODER PONER AMBAS TOTAL CARD EN LA MISMA LINEA
/// PROBLEMA: NO PUEDO IMPRIMIR EL ICONO DE FONTAWESOME

export default function Home (){
    return (
        <div>
          <h2 style={{color: 'green'}}> ACA SE MONTO EL COMPONENTE HOME </h2>
        {/* <!-- Minicard con totales de productos y usuarios --> */}

          <div row> 
          {totalCardsInfo.map((data) => {
            return <TotalCard {...data} key={data.id} />;
            })}         
          </div>          
          <i className={`fas fa-box-full fa-2x text-gray-300`}></i>
          <i className={`fa-regular fa-champagne-glasses`}></i>             
          <LastRegister/>
          <LastRegister/> 
          <CategoriesPanel/>
      </div>
      
    )
}