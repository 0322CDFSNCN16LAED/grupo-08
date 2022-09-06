import React from "react";
import {useState, useEffect} from 'react';
import { Card, Typography, Grid } from "@mui/material";

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
        console.log('%cSe actualizó el componente', 'color: yellow');
    }, [weather])
                      
    return(
        <Card  variant="outlined" sx={{ backgroundColor: 'white', textAlign: 'center'}}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" >
            Estado del clima
            </Typography>
            
        { weather ?  
            <Grid container spacing ={2}>
                <Typography variant="h5" component="div">
                {weather.weather[0].description}          
                </Typography>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                <Typography color="text.secondary">
                Temperatura:  {weather.main.temp} <br />
                Sensación térmica: {weather.main.feels_like} <br />
                Máx:  {weather.main.temp_max}  Min: {weather.main.temp_min}
                </Typography>
            </Grid>
        : <p> Cargando... </p> }
        </Card>
    )
}



