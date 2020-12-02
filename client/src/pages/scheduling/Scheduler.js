import React, { useState } from "react";
import Container from "../../components/Layout/Container";
import { Box, Grid, Button, Divider, Typography, Paper, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Timer } from "@material-ui/icons";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10)
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

const Scheduler = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();
  const [selectedDay, setSelectedDay] = useState(null);
  console.log(selectedDay);
  return (
    <Container>
      <Paper className={classes.root}>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <Typography variant="subtitle1" align={matches ? "center" : "inherit"} gutterBottom>John Doe</Typography>
              <Typography variant="h5" align={matches ? "center" : "inherit"} gutterBottom>Event Name</Typography>
              <Grid container spacing={1} alignItems="center" justify={matches ? "center" : "flex-start"}>
                <Grid item>
                  <Timer />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">60 min</Typography>
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
                  <Typography className={classes.chosenDay} align="center">{selectedDay.month}/{selectedDay.day}/{selectedDay.year}</Typography>
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
    </Container>
  )
}

export default Scheduler;
