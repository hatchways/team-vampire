import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import Container from "../../components/Layout/Container";
import { 
  Box, 
  Grid, 
  Button, 
  Divider, 
  Typography,
  Paper, 
  useMediaQuery, 
  TextField
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Timer, EventAvailable, Public } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  },
  nav: {
    marginTop: theme.spacing(2)
  },
}));

const Confirm = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const eventTypeID = props.match.params.event_type;
  const [eventType, setEventType] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(null);


  const timeslot = props.match.params.timeslot;
  const timeStart = new Date(timeslot);
  const timeEnd = new Date(timeslot);
  if (eventType) {
    timeEnd.setMinutes(timeEnd.getMinutes() + Number(eventType.duration));
  }
  const timezone = `${timeStart.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop()} - ${Intl.DateTimeFormat().resolvedOptions().timeZone}` 
  
  function initialFetch(eventTypeID) {
    axios.get(`http://localhost:3001/api/meeting_types/single/${eventTypeID}`)
      .then(response => setEventType(response.data));
  }

  useEffect(() => {
    initialFetch(eventTypeID);
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = (event) => { 
    event.preventDefault();
    
    const appointmentData = {
      meetingTypeId : eventType.id,
      eventTypeName: eventType.name,
      userId : eventType.user.id,
      name,
      email,
      timeStart,
      timeEnd,
      timezone 
    }

    axios.post("http://localhost:3001/api/appointments", appointmentData)
      .then(response => axios.post("http://localhost:3001/api/appointments/addevent", appointmentData))
      .catch(error => console.log(error))
    
    setRedirect("/success");
  
  };

  if (redirect) {
    return <Redirect to={redirect} />
  }

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
            <Grid item md={4} xs={12}>
              <Typography variant="subtitle1" align={matches ? "center" : "inherit"} gutterBottom>
                {eventType.user.firstName} {eventType.user.lastName}
              </Typography>
              <Typography variant="h5" align={matches ? "center" : "inherit"} gutterBottom>{eventType.name}</Typography>
              <Grid container spacing={1} alignItems="center" justify={matches ? "center" : "flex-start"}>
                <Grid item>
                  <Timer />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">{eventType.duration} min</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" justify={matches ? "center" : "flex-start"}>
                <Grid item>
                  <EventAvailable color="secondary" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="secondary">
                    {timeStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {timeEnd.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, {timeStart.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" justify={matches ? "center" : "flex-start"}>
                <Grid item>
                  <Public />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">{timezone}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation={matches ? "horizontal" : "vertical"} flexItem={matches ? false : true} fullWidth />
            <Grid container item md={8} xs={12} spacing={1} >
              <Grid item md={12} xs={12}>
                <Typography variant="h6" align={matches ? "center" : "inherit"} gutterBottom>Enter Details</Typography>
              </Grid>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                  <Grid item container>
                    <Grid item xs={12} md={8} >
                      <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        onChange={handleNameChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container >
                    <Grid item xs={12} md={8} >
                      <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={handleEmailChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth={matches ? true : false}
                    >
                      Schedule Event
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Paper>      
      }
    </Container>
  );
};

export default Confirm;