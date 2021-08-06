import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';

// GET Element by text, that matches with the day && time onclick

const useStyles = makeStyles({
  "@keyframes color-gradient": {
    "0%": {
      background: "rgba(0,101,255,0.7)"
    },
    "30%": {
      background: "rgba(0,131,255,0.7)"
    },
    "40%": {
      background: "rgba(255,215,142,0.7)"
    },
    "60%": {
      background: "rgba(255,216,0,0.7)"
    },
    "80%": {
      background: "rgba(255,110,0,0.7)"
    },
    "100%": {
      background: "rgba(255,53,0,0.7)"
    }
  },
  root: {
    width: 100,
    fontWeight: 2,
    display: "inline-block",
    textAlign: "center"
  },
  title: {
    fontSize: 14,
  },
  parent: {
    fill: "red",
    // backgroundColor: "rgb(100,100,140)",
    width: "100px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  child: {
    backgroundColor: "red",
    width: "100px",
    height: (props: any) =>
      ((props.hour.main.temp + 20) * 1.5),
    position: "relative",
    marginTop: "auto",
    borderRadius: "5px 5px 0px 0px",
    animation: `$color-gradient 45s linear 1`,
    animationFillMode: "forwards",
    animationPlayState: "paused",
    animationDelay: (props: any) =>
      `-${props.hour.main.temp + 10}s`
  },
  temperature: {
    textAlign: "center",
    position: "relative",
    marginTop: "10px"
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    marginRight: "0px",
  }
});

function getTime(unix_timestamp: number) {
  const date = new Date(unix_timestamp * 1000);
  let hours = date.getHours().toString();
  if (hours.length === 1) {
    hours = "0" + hours
  }
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
  const svgRef = useRef<SVGSVGElement | null>(null);

  const classes = useStyles(props);

  const rain: any = Math.round(props.hour.pop * 100);
  const icon = props.hour.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
  const temp = `${Math.round(props.hour.main.temp * 10) / 10}°C`
  // var rounded = Math.round(number * 10) / 10
  //`${parseFloat(props.hour.main.temp)}°C`

  // useEffect(() => {
  //   const tempNumber = props.hour.main.temp;
  //   const width = 100;
  //   const height = 100;
  //   const scale = 3;
  //   const scaledHeight = (tempNumber * scale);
  //   const y = height - scaledHeight;

  //   const svg = d3.select(svgRef.current)
  //     .attr("width", width)
  //     .attr("height", height)

  //   svg.append("rect")
  //     .attr("fill", "red")
  //     .attr("width", width)
  //     .attr("height", scaledHeight)
  //     .attr("y", y)
  //     .append("text")
  //     .text(temp)
  //     .attr("font-size", "100px")
  //     .attr("y", y)
  //     .attr("text-anchor", "middle")
  //     .attr("fill", "black")
  //     .attr("width", width)
  //     .attr("margin", 0)

  // }, [props.hour])




  return (
    <Card className={`${classes.root} target`} variant="outlined" id={props.hour.dt} >
      <CardContent>
        <Typography>
          {getDay(props.hour.dt)}
          <br />
          {getTime(props.hour.dt)}
          <br />

          <img src={iconUrl} className={classes.img}/>

        </Typography>
        {/* <Typography variant="h6" component="h6">
          {temp}
          <br />
        </Typography> */}
        <Typography color="textSecondary">
          Chance
          <br /> 
          of Rain: 
          <br />
          </Typography>
          <Typography>
          {rain}%
        </Typography>

      </CardContent>
      {/* <svg ref={svgRef}></svg> */}
      <div className={classes.parent}>
        <div className={classes.child}>
          <Typography className={classes.temperature}>
            {temp}
          </Typography>

        </div>
      </div>
    </Card>
  );
}
export default WeatherTable
