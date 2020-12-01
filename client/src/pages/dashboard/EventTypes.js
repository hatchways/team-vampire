import React from "react";
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
                  <Typography>John Doe</Typography>
                </Grid>
                <Grid item>
                  <Typography color="primary"><a>calendly.com/john-doe</a></Typography>
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
            <Grid item xs={12} md={4}>
              <EventTypeCard name="Sprint Planning" duration="60" />
            </Grid>
            <Grid item xs={12} md={4}>
              <EventTypeCard name="Standups" duration="15"/>
            </Grid>
            <Grid item xs={12} md={4}>
              <EventTypeCard name="Office Hours" duration="45"/>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default EventTypes;
