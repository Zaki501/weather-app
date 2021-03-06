import { Grid, makeStyles, Box } from "@material-ui/core";
import React from "react";
import WeatherCard from "./WeatherCard";
import WeatherTable from "./WeatherTable";
import WeatherThumbnail from "./WeatherThumbnail";


const Content = (props: { DailyData: any, HourlyData: any, CityAndCountry: any, FocusCard: number, changeFocus: any }) => {

    const useStyles = makeStyles({
        table: {
            // https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6
          
            width: "787px",
            display: "block",
            overflowX: "scroll",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            position: "relative"
        },
        item: {
            alignSelf: "end"
        }
    });

    const classes = useStyles();

    return (

        <Grid>
            <Box>
                <h1>{props.CityAndCountry.city}, {props.CityAndCountry.country_name}</h1>
                <Grid container>

                    {props.DailyData.daily.map((day: any, index: number) => {
                        //if focusCard number === index return WeatherCard, else return WeatherThumbnail
                        // {<WeatherThumbnail Day={day} Index={index}/> ? props.FocusCard === index : <WeatherThumbnail Day={day} Index={index}/>}
                        //  {props.FocusCard === index ? <WeatherThumbnail Day={day} Index={index}/> :  <WeatherThumbnail Day={day} Index={index}/>}

                        if (props.FocusCard === index) {
                            return (
                                <Grid>
                                    <WeatherCard Day={day}/>
                                </Grid>
                            )
                        } else 
                        if (index < 6) {
                            return (
                                <Grid item className={classes.item}>
                                    {<WeatherThumbnail Day={day} Index={index} changeFocus={props.changeFocus}/>}
                                </Grid>
                            )
                        }
                    })}
                </Grid>
               

            </Box>
            
            <Box className={classes.table} id="container">



                {props.HourlyData.list.map((hour: any) => {
                    return (
                       <WeatherTable hour={hour} />

                    )
                })}

            </Box>

            

        </Grid>

    )
}


export default Content;