const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=Manchester&appid=YOUR-API-KEY&units=metric"
    https.get(weatherApi, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
        })
    })
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "YOUR-API-KEY"
    const unit = "metric"
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(weatherAPI, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            res.write("<h1>Temp " + temp + "</h1>");
            res.write("<h2>" + weatherDesc + "</h2>");
            res.write("<img src=" + imgURL + ">");
        })
    })
})

app.listen(3000, function(){
    console.log("Application is running on port 3000");
});

// Photo by <a href="https://unsplash.com/@lukaszlada?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Łukasz Łada</a> on <a href="https://unsplash.com/s/photos/weather?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
// <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Royyan Wijaya - Flaticon</a>
    // res.write("<h1>Temp " + temp + "</h1>");
    // res.write("<h2>" + weatherDesc + "</h2>");
    // res.write("<img src=" + imgURL + ">");
