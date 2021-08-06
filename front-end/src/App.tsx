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
    // type: 'dark',
  },
})

function App() {
  const [DailyData, setDailyData] = useState<any | null>(null);
  const [ThreeHourData, setThreeHourData] = useState<any | null>(null);
  const [CityAndCountry, setCityAndCountry] = useState<any | null>(null);
  const [Loading, setLoading] = useState(true);
  const [FocusCard, setFocusCard] = useState(0);

  // length of bars - negative temps!
  // color of bar - use d3, or conditional css (array of possible color values, )

  const changeFocus = function (index: number, dt: any) {
    setFocusCard(index);

    const scrollableDiv = document.getElementById('container');
    const elements = document.getElementsByClassName("target");
    let array = [];

    for (let i = 0; i < elements.length; i++) {
      array.push(elements[i].id)
    }
    const closest = array.sort((a: any, b: any) => Math.abs(dt - a) - Math.abs(dt - b))[0]

    const targetElement = document.getElementById(closest);

    if (targetElement != null && scrollableDiv != null) {
      let x = targetElement.offsetLeft;
      scrollableDiv.scrollTo({ left: x - 300, behavior: 'smooth' });
    }

  };

  const fetchBackendData = async () => {
    const response = await fetch("/getUsersLocation");
    const { dailyData, threeHourData, cityAndCountry } = await response.json()
    setDailyData(dailyData);
    setThreeHourData(threeHourData);
    setCityAndCountry(cityAndCountry);
    setLoading(false);
  }

  // function to save data as state
  // const fetchLocalData = () => {
  //   setDailyData(JSONdata);
  //   setThreeHourData(JSONdata2);
  //   setLoading(false);
  // }
  // fetch Local data, on first render
  // useEffect(() => fetchLocalData(), [])

  useEffect(() => {
    fetchBackendData()

  }, [])

  // <div>{CityAndCountry.city}, {CityAndCountry.country_name}</div>
  return (
    <ThemeProvider theme={theme}>

      {Loading ? "Loading..." : <Content DailyData={DailyData} HourlyData={ThreeHourData} CityAndCountry={CityAndCountry} FocusCard={FocusCard} changeFocus={changeFocus} />}
    </ThemeProvider>
  );
}

export default App;
