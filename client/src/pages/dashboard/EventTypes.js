import React, { useContext } from "react";
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

  const userContext = useContext(UserProvider.context);
  const currentUser = userContext.user.user;
  
  return (
    <>
      <DashboardHeader />
      {
        currentUser && (
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
                    <Typography>{currentUser.firstName} {currentUser.lastName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="primary">calendly.com/{currentUser.firstName.toLowerCase()}-{currentUser.lastName.toLowerCase()}</Typography>
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
              {currentUser.meetingTypes.map(({ id, name, duration }) => (
                <Grid key={id} item xs={12} md={4}>
                  <EventTypeCard 
                    id={id} 
                    firstName={currentUser.firstName} 
                    lastName={currentUser.lastName} 
                    name={name} 
                    duration={duration} 
                    />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
        )
      }
    </>
  );
};

export default EventTypes;
