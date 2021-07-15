import React from "react";

export default function FetchData(props: {Data: any}) {
    console.log("fetchdata:", Object.keys(props.Data))
    const {lat, lon, timezone, timezone_offset, current, minutely, hourly, daily} = props.Data;
    console.log(lat, lon);

// 5 DAY / 3 HOUR FORECAST = https://api.openweathermap.org/data/2.5/forecast?lat=51&lon=0.1&appid=__&units=metric
// ONE CALL API = https://api.openweathermap.org/data/2.5/onecall?lat=51&lon=0.1&exclude=minutely,hourly&appid=__&units=metric



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
        <div>
            {/* <h1>  {Loading ? "Loading..." : [title, first, last]} </h1>  */}
            data is {props.Data.current.dt}
        </div>
    )
}
