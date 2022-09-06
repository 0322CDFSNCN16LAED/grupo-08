import React from 'react';

import TotalCard from './TotalCard';
import {totalCardsInfo} from '../consts/totalCardsInfo';
import LastRegister from './LastRegister';
import CategoriesPanel from './CategoriesPanel';
/// PROBLEMA: NO TOMA ROW PARA PODER PONER AMBAS TOTAL CARD EN LA MISMA LINEA

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
       
          <LastRegister/>
          <LastRegister/> 
          <CategoriesPanel/>
      </div>
      
    )
}