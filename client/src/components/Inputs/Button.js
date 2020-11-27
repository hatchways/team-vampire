import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function MUIButtons({ variant, color, text, component, to, type, fullWidth }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button 
        variant={variant}
        color={color}
        component={component}
        to={to}
        type={type}
        fullWidth={fullWidth === "true" ? true : false}
        >
        {text}
    </Button>
    </div>
  );
}

