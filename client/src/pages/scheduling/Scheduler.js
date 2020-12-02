import React from "react";
import Container from "../../components/Layout/Container";
import { Box, Grid, Divider, Typography } from "@material-ui/core";
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
      <Box p={1} border={1} borderRadius="borderRadius" borderColor="grey.500" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
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
          <Divider orientation="vertical" flexItem />
          <Grid container item md={9} xs={12} spacing={1}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6" gutterBottom>Select a Date & Time</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography>Calendar</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography>Time Picker</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Scheduler;
