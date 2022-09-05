import React from 'react';

import TotalCard from './Totalcards';
import {totalCardsInfo} from '../consts/totalCardsInfo';
import LastRegister from './LastRegister';

export default function Home (){
    return (
        <div className="row">
          <h2 style={{color: 'green'}}> ACA SE MONTO EL COMPONENTE HOME </h2>
        {/* <!-- Minicard con totales de productos y usuarios --> */}
        {totalCardsInfo.map((data) => {
          return <TotalCard {...data} key={data.id} />;
          })}
          <LastRegister/>
          
          <LastRegister/> 
      </div>
      
    )
}