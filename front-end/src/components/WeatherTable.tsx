import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';

// GET Element by text, that matches with the day && time onclick

const useStyles = makeStyles({
  root: {
    width: 100,
    fontWeight: 2,
    display: "inline-block"
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
    justifyContent: "space-between",
  },
  child: {
    backgroundColor: "red",
    width: "100px",
    height: (props: any) =>
      props.hour.main.temp * 3,
    position: "relative",
    marginTop: "auto"
  },
  temperature: {
    textAlign: "center",
    position: "relative",
    marginBottom: 0
    

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
function focusTable(day: number) {

}

const WeatherTable = (props: { hour: any }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const classes = useStyles(props);

  const rain: any = Math.round(props.hour.pop * 100);
  const icon = props.hour.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
  const temp = `${parseFloat(props.hour.main.temp)}°C`

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
    <Card className={classes.root} variant="outlined" id={props.hour.dt}>
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
          {temp}
          <br />
        </Typography>
        <Typography color="textSecondary">
          {/* Chance of Rain: {rain}% */}
          <br />
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

//get element by ID, <a> to ID
// click the anchored element, has ID of the current date
// search through list of table elements
// go to 

// on click, find and goto match for 'dt' of daily element. if indexof thumbnail == 0, go to start

// function(a) {
//   var c = window.metoffice.scrolltabs,
//     b = window.metoffice.requestUtil,
//     d = window.scrollY || window.pageYOffset,
//     e = window.metoffice.domUtil,
//     f = window.metoffice.eventBus,
//     g = e.getClosest(a.target, "li"),
//     h = g.dataset.tabId,
//     l = g.dataset.tabIndex,
//     e = e.getClosest(a.target, "ul").getAttribute("id"),
//     k = document.getElementById(h);
//   g.classList.contains("tab-active") || (b.replaceHashedQueryStringParameter(c.queryStringParameter[c.navContainerId],
//     h), c.selectTab(h, e), "undefined" !== typeof f && f.notifyEventSubscribers("tab-changed", {
//     tabId: h,
//     tabIndex: l,
//     containerId: e
//   }));
//   k.focus({
//     preventScroll: !0
//   });
//   setTimeout(function() {
//     d !== (window.scrollY || window.pageYOffset) && window.scrollTo(window.scrollX || window.pageXOffset, d)
//   }, 0);
//   a.preventDefault()
// }