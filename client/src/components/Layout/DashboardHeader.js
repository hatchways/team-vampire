/* eslint-disable react/prop-types */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Container from "./Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "-10px"
  }
}));

const DashboardHeader = (props) => {
  const path = props.location.pathname;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <div>
          <h1>My CalendApp</h1>
        </div>
        <div>
          <Button
            component={Link}
            to="/event_types/user/me"
            color={path === "/event_types/user/me" ? "secondary" : "default"}
          >
            Event Types
          </Button>
          <Button
            component={Link}
            to="/app/scheduled_events/user/me"
            color={path === "/app/scheduled_events/user/me" ? "secondary" : "default"}
          >
            Scheduled Events
          </Button>
        </div>
      </Container>
      {props.children}
    </div>
  );
};

export default withRouter(DashboardHeader);
