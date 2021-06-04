import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Time, weather icon, chaince of rain, temp  
//time, temp, wind, weather condition /w icons, chance of rain

const useStyles = makeStyles({
  root: {
    width: 100,
    fontWeight: 2,
    display: "inline-block"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

function getTime(unix_timestamp: number) {
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime
}
function getDay(unix_timestamp: number) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(unix_timestamp * 1000);
  const Day = days[date.getDay()];
  return Day;
}

const WeatherTable = (props: { hour: any }) => {
  const classes = useStyles();

  const rain: any = Math.round(props.hour.pop * 100);
  const icon = props.hour.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography>
          {getDay(props.hour.dt)}
          <br />
          {getTime(props.hour.dt)}
          <br />
    
          {/* <img src={iconUrl}/> */}
          icon

        </Typography>
        <Typography variant="h6" component="h6">
          {props.hour.main.temp}°C
          <br />
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {/* Chance of Rain: {rain}% */}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
export default WeatherTable