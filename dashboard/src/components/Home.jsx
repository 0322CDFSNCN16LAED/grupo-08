import React from 'react';

import TotalCard from './TotalCard';
import {totalCardsInfo} from '../consts/totalCardsInfo';
import LastRegister from './LastRegister';
import CategoriesPanel from './CategoriesPanel';

export default function Home (){
    return (
        <div>
          <h2 style={{color: 'green'}}> ACA SE MONTO EL COMPONENTE HOME </h2>
        {/* <!-- Minicard con totales de productos y usuarios --> */}

          <div> 
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