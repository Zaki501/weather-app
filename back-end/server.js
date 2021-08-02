require('dotenv').config()
const fetch = require('node-fetch');
const express = require('express');

const app = express();

const port = process.env.PORT;
const IP_KEY = process.env.IP_KEY
const WEATHER_KEY = process.env.WEATHER_KEY

/*
Example: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
How to get lat and long:
  user enters location OR get users position 

*/

// get ip address
app.get("/", function (req, res) {
  res.send('your IP is: ' + req.socket.remoteAddress);
});

// use ip address to get lon and lat

// get data from url
const fetchData = async (url) => {
  const response = await fetch(url);
  const JSONdata = await response.json();
  return JSONdata
}


// when wait for a response from an api, make the callback function async, and await the promise reponse
app.get("/getUsersLocation", async function (req, res) {
  // get the ip address
  // get the lat and lon
  // get the weather
  // send data to front

  // const ipAddress = req.socket.remoteAddress;
  // random ip address -> https://www.ipvoid.com/random-ip/
  const ipAddress = '142.235.32.178';

  // const url = 'https://api.ipgeolocation.io/ipgeo?apiKey=IPKEY&ip=ipAddress';
  const geolocationUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_KEY}&ip=${ipAddress}`

  const location = await fetchData(geolocationUrl);
  const { latitude, longitude } = location;

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

  res.json({ "daily_data": dailyData, "hourly_data": threeHourData });
})


// use lat and lon to get weather 



/*
app.get("/http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=55b367e1dff8adb640b0500f628d0a83", function(req, res) {
  res.json(data)
})
*/
app.listen(port, function () {
  console.log(`Your app is listening on ${port}`);
});
