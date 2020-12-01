import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  colorPrimary: {
    background: "#FFCC99"
  },
  barColorPrimary: {
    backgroundColor: "#Fe7d11"
  }
});

export default function ProgressBar () {
  const classes = useStyles();
  const progress = 20;
  return (
    <div className={classes.root}>
      <LinearProgress classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} variant="determinate" value={progress} />
    </div>
  );
}
