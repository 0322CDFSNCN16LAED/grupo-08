import React from "react";
import {useState, useEffect} from 'react';

// const api = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}'
// const apiKey = 'b5ebf1bf183b477557a932990aadfa01';

export default function Weather (){
    const [weather, setWeather] = useState(null);
   
    useEffect( () => {
        console.log('%cSe montó el componenente', 'color: green');
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=-34.599722&lon=-58.381944&appid=b5ebf1bf183b477557a932990aadfa01&units=metric&lang=es')
            .then(response => response.json())
            .then(data => {
               setWeather(data)
                console.log(data)
            })
        .catch(error => console.error (error))
    }, []);
    
    useEffect(()=> {
        console.log('%cSe actualizó el componenente', 'color: yellow');
    }, [weather])
                      
    return(
        <div>
            <h4 style={{color: 'green'}}> Soy el componente Weather</h4>
            <h2> Estado del clima </h2>
           { weather ?  
            <div>
            <p> {weather.weather[0].description}</p>  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
            <p> Temperatura:  {weather.main.temp} Sensación térmica: {weather.main.feels_like}</p>
            <p> Máx:  {weather.main.temp_max}  Min: {weather.main.temp_min} </p></div>
            : <p> Cargando... </p> }
        </div>
    )
}



