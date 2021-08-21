require('dotenv').config()
const fetch = require('node-fetch');
const cors = require('cors')
const express = require('express');
const path = require('path');

const app = express();
app.use(cors())

const port = process.env.PORT || 3001;
const IP_KEY = process.env.IP_KEY
const WEATHER_KEY = process.env.WEATHER_KEY

// get data from url
const fetchData = async (url) => {
  const response = await fetch(url);
  const JSONdata = await response.json();
  return JSONdata
}

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/getWeather", async function (req, res) {
  // random ip address -> https://www.ipvoid.com/random-ip/
  // const ipAddress = '218.114.144.102';
  const ipAddress = req.socket.remoteAddress;

  // const url = 'https://api.ipgeolocation.io/ipgeo?apiKey=IPKEY&ip=ipAddress';
  const geolocationUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_KEY}&ip=${ipAddress}`

  const location = await fetchData(geolocationUrl);
  const { city, country_name, latitude, longitude } = location;

  // console.log(city, country_name, latitude, longitude)
  const cityAndCountry = { "city": city, "country_name": country_name }

  const openWeatherApi = {
    dailyUrl: "https://api.openweathermap.org/data/2.5/onecall?",
    threeHourUrl: "https://api.openweathermap.org/data/2.5/forecast?",
    exclude: "minutely,hourly",
    key: WEATHER_KEY,
    units: "metric"
  }
  const { dailyUrl, threeHourUrl, exclude, key, units } = openWeatherApi;
  const dailyApiUrl = `${dailyUrl}lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${key}&units=${units}`
  const threeHourApiUrl = `${threeHourUrl}lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`

  const dailyData = await fetchData(dailyApiUrl);
  const threeHourData = await fetchData(threeHourApiUrl);


  // 5 DAY / 3 HOUR FORECAST = https://api.openweathermap.org/data/2.5/forecast?lat=51&lon=0.1&appid=__&units=metric
  // ONE CALL API = https://api.openweathermap.org/data/2.5/onecall?lat=51&lon=0.1&exclude=minutely,hourly&appid=__&units=metric

  res.json({ "dailyData": dailyData, "threeHourData": threeHourData, "cityAndCountry": cityAndCountry });
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

app.listen(port, function () {
  console.log(`Your app is listening on ${port}`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
}
