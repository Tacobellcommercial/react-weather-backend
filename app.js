require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors({
    allowed: "*"
}))

app.use(express.json());

app.post("/city-data", (req, res)=>{
    if (req.body.city !== ""){
        let url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&appid="+process.env.WEATHER_API;
        fetch(url).then(response=>{
            return response.json();
        }).then(data=>{
            if (data.cod==="404"){
                res.json({message: "City not found, please check again..."});
            }else{
                res.json({
                            message: "success",
                            temperature: data.main.temp,
                            feelsLike: data.main.feels_like,
                            high: data.main.temp_max,
                            low: data.main.temp_min,
                            humidity: data.main.humidity,
                            windspeeds: data.wind.speed,
                            airPressure: data.main.pressure,
                            short: data.weather[0].main,
                            long: data.weather[0].description,
                            coordinates: {long: data.coord.lon, lat: data.coord.lat},
                            city: req.body.city
                        })
            }
        })
    }else{
        res.json({message: "City not found, please check again..."})
    }
})

app.listen(process.env.PORT, ()=>{
    console.log("Listening on port 3000");
})