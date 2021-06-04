import React, { useState, useEffect } from 'react';
import JSONdata from "./data/database.json"  //openWeather - one call api
import JSONdata2 from "./data/FiveDayForecast.json"
import Content from "./components/Content"
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: 'dark',
  },
})

function App() {

  const [DailyData, setDailyData] = useState<any | null>(null);
  const [ThreeHourData, setThreeHourData] = useState<any | null>(null);
  const [Loading, setLoading] = useState(true);
  const [FocusCard, setFocusCard] = useState<any | null>(null);

  function changeFocus(index : number) {
    setFocusCard(index);
    console.log("new index is:", index);
  }

  //save data as state
  const fetchLocalData = () => {
    setDailyData(JSONdata);
    setThreeHourData(JSONdata2);
    setLoading(false);
  }
  // fetch Local data, on first render
  useEffect(() => fetchLocalData(), [])

  // useEffect(() => { fetchData(apiUrl) }, []);

  // const fetchData = async (url: string) => {
  //   const response = await fetch(url);
  //   const JSONdata = await response.json();
  //   setData(JSONdata);
  //   setLoading(false);
  // }

  // //"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}",

  // const apiData = {
  //   url: "https://api.openweathermap.org/data/2.5/onecall?",
  //   lat: 51,
  //   lon: 0.1,
  //   exclude: "minutely,hourly",
  //   key: "_",
  //   units: "metric"
  // }
  // const { url, lat, lon, exclude, key ,units} = apiData;
  // const apiUrl = `${url}lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${key}&units=${units}`

  // console.log(apiUrl)

  

  return (
    

      <ThemeProvider theme={theme}>
        {Loading ? "Loading..." : <Content DailyData={DailyData} HourlyData={ThreeHourData} FocusCard={FocusCard} changeFocus={changeFocus}/>}
      </ThemeProvider>


   
  );
}

export default App;
