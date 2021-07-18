import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardActionArea, CardHeader, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    // border: "1px solid red",
    width: "100px",
    fontWeight: 1,
    borderRadius: 0,
    psition: "relative",
    // display: "inline-block",
    alignSelf: "end"

  },
  title: {
    fontSize: "0.9em"
  },
  test: {
    // border: "1px solid red",
    padding: "0 0 10px 0",
    width: "80px",
    marginRight: "30px"
  }
});

const WeatherThumbnail = (props: { Day: any, Index: number, changeFocus: any }) => {
  const classes = useStyles();

  const icon = props.Day.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`

  const tempHigh = `${Math.round(props.Day.temp.max)}°c`;
  const tempLow = `${Math.round(props.Day.temp.min)}°c`;

  

  return (
    //
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={() => props.changeFocus(props.Index, props.Day.dt)}>


        <CardContent>
          <Typography className={classes.title}>
            {new Date(props.Day.dt * 1000).toDateString().split(" ").slice(0, -1).join(" ")}
          </Typography>

        </CardContent>
        <CardHeader
          className={classes.test}
          avatar={
            <Avatar src={iconUrl} />
          }
          title={tempHigh}
          subheader={tempLow}
        />

      </CardActionArea>
    </Card>
  );
}
export default WeatherThumbnail