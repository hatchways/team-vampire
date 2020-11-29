import React from "react";
import { Card, CardActions, CardContent, Typography, Divider, Button, Grid, IconButton, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Settings, Timer } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function EventTypeCard () {
  const classes = useStyles();

  return (
    <Box borderTop={5} borderColor="primary.main" borderRadius="borderRadius">
      <Card className={classes.root}>
        <CardContent>
          <Grid container item justify="flex-end">
            <IconButton
              edge="end"
            >
              <Settings/>
            </IconButton>
          </Grid>
          <Typography variant="h6" component="h2">
          15 minute meeting
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            One-on-One
          </Typography>
        </CardContent>
        <Divider/>
        <CardActions>
          <Grid container justify="space-between">
            <Grid container justify="flex-start" alignItems="center" item xs={6} spacing={1}>
              <Grid item>
                <Timer />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">15 min</Typography>
              </Grid>
            </Grid>
            <Grid container justify="flex-end" item xs={6}>
              <Button variant="outlined" color="secondary" size="small">Copy Link</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}
