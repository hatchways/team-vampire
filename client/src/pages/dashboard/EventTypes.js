import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserProvider from "../../contexts/UserProvider";
import { Link } from "react-router-dom";
import Container from "../../components/Layout/Container";
import DashboardHeader from "../../components/Layout/DashboardHeader";
import EventTypeCard from "../../components/DataDisplay/EventTypeCard";

import { Grid, Typography, Button, Divider, useMediaQuery } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px"
  },
  divider: {
    marginTop: "10px"
  },
  userInfo: {
    marginLeft: "1px"
  },
  newEvent: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "2px"
    }
  },
  eventTypes: {
    marginTop: "5px"
  }
}));

const EventTypes = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const userData = useContext(UserProvider.context);
  console.log(userData);
  // const [eventTypes, setEventTypes] = useState([]);
  
  // useEffect(() => {
  //   if (userData.user) {
  //     axios.get(`http://localhost:3001/api/meeting_types/${userData.user.id}`)
  //       .then(response => setEventTypes(response.data));
  //   }
  // }, [userData.user])

  
  return (
    <>
      <DashboardHeader />
      <Container >
        <div className={classes.root}>
          <Grid container alignContent="center" justify="space-between" spacing={1}>
            <Grid className={classes.userInfo}
              container justify="flex-start" spacing={1} item xs={12} md={8}>
              <Grid item xs={1} >
                <AccountCircle />
              </Grid>
              <Grid container direction="column" item xs={11}>
                <Grid item>
                  {/* {userData.user &&
                    <Typography>{userData.user.firstName} {userData.user.lastName}</Typography>
                  } */}
                </Grid>
                <Grid item>
                  {/* {userData.user &&
                    <Typography color="primary">calendly.com/{userData.user.firstName.toLowerCase()}-{userData.user.lastName.toLowerCase()}</Typography>
                  } */}
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.newEvent}
              item xs={12} md={4}
              container alignContent="center" justify="flex-end">
              <Button
                component={Link}
                to="/event_types/new"
                variant="outlined"
                color="primary"
                fullWidth={!matches}
              >
              + New Event Type
              </Button>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid className={classes.eventTypes} container spacing={4} justify="flex-start">
            {/* {
              eventTypes.map(({ id, name, duration }) => (
                <Grid key={id} item xs={12} md={4}>
                  <EventTypeCard name={name} duration={duration} />
                </Grid>
              ))
            } */}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default EventTypes;
