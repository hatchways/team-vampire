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
  },
  selected: {
    borderBottom: "5px solid",
    borderBottomColor: theme.primary
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
            className={path === "/event_types/user/me" ? classes.selected : ""}
          >
            Event Types
          </Button>
          <Button
            component={Link}
            to="/app/scheduled_events/user/me"
            className={path === "/app/scheduled_events/user/me" ? classes.selected : ""}
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
