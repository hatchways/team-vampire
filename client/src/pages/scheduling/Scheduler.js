import React from "react";
import Container from "../../components/Layout/Container";
import { Card, CardContent, Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Timer } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10)
  },
  timer: {
    fontsize: "5rem"
  }
}));

const Scheduler = () => {
  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="subtitle1" gutterBottom>John Doe</Typography>
              <Typography variant="h5" gutterBottom>Event Name</Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Timer className={classes.timer} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">60 min</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Scheduler;
