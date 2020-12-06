/* eslint react/prop-types: 0 */
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card,
  CardActions,
  CardContent, 
  Typography, 
  Divider, 
  Button, 
  Grid, 
  IconButton, 
  Box 
} from "@material-ui/core";
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

export default function EventTypeCard (props) {
  const classes = useStyles();
  const { 
    firstName,
    lastName,
    id, 
    name, 
    duration } = props;
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
            {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            One-on-One
          </Typography>
          <Grid container justify="flex-start" alignItems="center" item xs={6} spacing={1}>
              <Grid item>
                <Timer />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{duration} min</Typography>
              </Grid>
            </Grid>
        </CardContent>
        <Divider/>
        <CardActions>
          <Grid container justify="space-between">
            <Grid container justify="flex-start" alignItems="center" item xs={6} spacing={1}>
              <Grid item>
                <Link 
                  to={
                    {
                      pathname: "/calendar",
                      schedulerProps: {
                        firstName,
                        lastName,
                        id, 
                        name, 
                        duration
                      }                     
                    }
                  }
                >
                  <Typography variant="subtitle2">
                    /{id.substring(0,8)}...
                  </Typography>
                </Link>
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
