import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../../components/Layout/Container";
import { Box, Grid, Button, Divider, Typography, Paper, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Timer } from "@material-ui/icons";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  },
  nav: {
    marginTop: theme.spacing(2)
  },
  chosenDay: {
    marginTop: theme.spacing(4)
  },
  timePicker: {
    height: "300px",
    overflowY: "auto",
    '& > *': {
      marginTop: theme.spacing(3),
    }
  },
  noAvail: {
    marginTop: theme.spacing(3)
  }
}));

const Scheduler = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();


  const eventTypeID = props.match.params.event_type;
  const [eventType, setEventType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null)


  function initialFetch(eventTypeID) {
    axios.get(`http://localhost:3001/api/meeting_types/single/${eventTypeID}`)
      .then(response => {
        setEventType(response.data);
        const todaysDate = new Date();
        const tomorrowsDate = new Date(todaysDate);
        tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);

        const day =  tomorrowsDate.getDate();
        const month = tomorrowsDate.getMonth() + 1; // have to increment by 1 to display correct month for calendar component
        const year = tomorrowsDate.getFullYear();

        console.log("day: ", day)
        console.log("month: ", month)
        console.log("year: ", year)

        setSelectedDay({
          day,
          month,
          year
        });
        
        fetchTimeSlots(response.data, day, month, year);
      });    
  }

  async function fetchTimeSlots(eventType, day, month, year) {
    await axios.get(`http://localhost:3001/api/avail/timeslots?user=${eventType.user.id}&day=${day}&month=${month - 1}&year=${year}&duration=${eventType.duration}`)
    .then(response => setAvail(response.data));
  };

  // Retrieve Event Type Information from params
  useEffect(() => {
    initialFetch(eventTypeID);
  }, []);

  const [avail, setAvail] = useState([]);

  const handleDaySelection = async (props) => {
    setSelectedDay(props);
    const { day, month, year } = props;
    fetchTimeSlots(eventType, day, month, year);
  };

  return (
    <Container>
      <Grid container justify="flex-end">
        <Grid container justify="flex-end" item xs={4}>
          <Button 
            className={classes.nav} variant="outlined" 
            href="http://localhost:3000/event_types/user/me">Home</Button>
        </Grid>
      </Grid>
      {eventType && 
      <Paper className={classes.root}>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <Typography variant="subtitle1" align={matches ? "center" : "inherit"} gutterBottom>{eventType.user.firstName} {eventType.user.lastName}</Typography>
              <Typography variant="h5" align={matches ? "center" : "inherit"} gutterBottom>{eventType.name}</Typography>
              <Grid container spacing={1} alignItems="center" justify={matches ? "center" : "flex-start"}>
                <Grid item>
                  <Timer />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">{eventType.duration} min</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation={matches ? "horizontal" : "vertical"} flexItem={matches ? false : true} fullWidth />
            <Grid container item md={9} xs={12} spacing={1} >
              <Grid item md={12} xs={12}>
                <Typography variant="h6" align={matches ? "center" : "inherit"} gutterBottom>Select a Date & Time</Typography>
              </Grid>
              <Grid container justify="center" item md={6} xs={12}>
                <Calendar
                  value={selectedDay}
                  onChange={handleDaySelection}
                  shouldHighlightWeekends
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {selectedDay && 
                <>
                  <Typography className={classes.chosenDay} align="center">{new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day).toLocaleString("default", { month: "long" })} {selectedDay.day}, {selectedDay.year}</Typography>
                  { avail.length ? 
                    <div className={classes.timePicker}>
                      {avail.map((timeSlot, index) => {
                        return(
                          <Button key={index} variant="outlined" size="large" color="primary" fullWidth >{ (new Date(timeSlot.start)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }</Button>
                        )})}
                    </div>
                    : 
                    <div className={classes.noAvail}>
                        <Typography align={matches ?  "left" : "center"} gutterBottom>Sorry, all spots are booked today.</Typography>
                        <Typography align={matches ?  "left" : "center"} gutterBottom>Please try another day.</Typography>
                    </div>
                  }
                </>
                }
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>      
      }
    </Container> 
  )
}

export default Scheduler;
