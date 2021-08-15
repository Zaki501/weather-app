import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontWeight: 2,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

// FOR EACH DAY - unix to days date, sunrise, sunset, humidty, uv, max && min temp
// CURRENT DAY - current temp

const WeatherCard = (props: { Day: any }) => {
  const classes = useStyles();


  // const {lat, lon, timezone, timezone_offset, current, minutely, hourly, daily} = props.Data;

 // console.log(props.Day)
  //daily weather 
  //1620644400
 
  const rain : any = Math.round(props.Day.pop * 100);

  console.log(props.Day.weather[0].icon)

  const icon = props.Day.weather[0].icon;
  const iconUrl =`https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>     
        <Typography>
          {new Date(props.Day.dt * 1000).toDateString()}
          <br />
          <img src={iconUrl}/>
          
        </Typography>
        <Typography variant="h5" component="h2">
          High: {Math.round(props.Day.temp.max)}°C
          <br />
          Low: {Math.round(props.Day.temp.min)}°C  
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Chance of Rain: {rain}%
        <br />
          UV: {props.Day.uvi}
          <br />
          Humidity: {props.Day.humidity}%
        </Typography>
        <Typography variant="body2" component="p">
          Sunrise: {new Date(props.Day.sunrise * 1000).toLocaleTimeString()}
          <br />
          Sunset: {new Date(props.Day.sunset * 1000).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default WeatherCard