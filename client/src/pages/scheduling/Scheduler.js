import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    '& > *': {
      marginTop: theme.spacing(3),
    }
  }
}));

const Scheduler = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // console.log(props.match.params.event_type);
  const eventTypeID = props.match.params.event_type;

  const [eventType, setEventType] = useState(null);

  // Retrieve Event Type Information from params
  useEffect(() => {
    axios.get(`http://localhost:3001/api/meeting_types/single/${eventTypeID}`)
      .then(response => setEventType(response.data));
  }, []);


  const classes = useStyles();
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <Container>
      <Grid container justify="flex-end">
        <Grid container justify="flex-end" item xs={4}>
          <Button 
            className={classes.nav} variant="outlined" 
            // component={Link} 
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
                  onChange={setSelectedDay}
                  shouldHighlightWeekends
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {selectedDay && 
                <>
                  <Typography className={classes.chosenDay} align="center">{new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day).toLocaleString("default", { month: "long" })} {selectedDay.day}, {selectedDay.year}</Typography>
                  <div className={classes.timePicker}>
                    <Button variant="outlined" size="large" color="primary" fullWidth >16:30</Button>
                    <Button variant="outlined" size="large" color="primary" fullWidth >17:00</Button>
                    <Button variant="outlined" size="large" color="primary" fullWidth >17:30</Button>
                    <Button variant="outlined" size="large" color="primary" fullWidth >18:00</Button>
                  </div>
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
