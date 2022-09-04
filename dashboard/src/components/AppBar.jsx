import React from 'react';
import logo from '../logo.png';
import Weather from './Weather';

export  default function AppBar (){
    return(
        <div> 
            <h4 style={{color: 'green'}}> Soy el componente AppBar </h4>
        <img src={logo} alt="logo" />
        Aca me gustaria el weather a la derecha <Weather/>            
        </div>
    )
}