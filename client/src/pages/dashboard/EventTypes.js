import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Layout/Container";
import DashboardHeader from "../../components/Layout/DashboardHeader";

import { Grid, Typography, Button, Divider, useMediaQuery } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    backgroundColor: theme.palette.background.paper
  },
  divider: {
    marginTop: "10px"
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
            <Grid
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
            <Grid item xs={12} md={4} container alignContent="center" justify="flex-end">
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
        </div>
      </Container>
    </>
  );
};

export default EventTypes;
