import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    colorPrimary: {
        background: "#FFCC99",
    },
    barColorPrimary: {
        backgroundColor: '#Fe7d11',
    }
});

export default function ProgressBar(props) {
    const classes = useStyles();
    // const progress = props.progess;
    return (
        <div className={classes.root}>
            <LinearProgress classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} variant="determinate" value={props.progress} />
        </div>
    );
}
