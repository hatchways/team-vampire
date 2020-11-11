import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import { makeStyles } from "@material-ui/core/styles";
import CardContent from '@material-ui/core/CardContent';
import ProgressBar from '../components/LinearProgress';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
    root: {
        width: 700,
        height: 500,
        margin: "auto",
        marginTop: 120,
        borderRadius: "2%",
        alignItems: 'center',

    },
    button: {
        margin: theme.spacing(1),
    },
    boxShadow: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#FF7E00",
        padding: 15,
        paddingRight: 40,
        paddingLeft: 40,
        textTransform: "none",
    },
    centerText: {
        textAlign: "center",
    },
    boldFont: {
        fontWeight: "bold",
    },
    decor: {
        textDecoration: "none"
    },
    gridRoot: {
        flexGrow: 1,
    },
    gridPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    divider: {
        margin: theme.spacing(1, 0),
    }

}));


export default function GoogleConnected(props) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Box className={classes.centerText} mb={5}>  <span style={{ color: "#FF7E00", fontWeight: "bold", fontSize: "18px" }}>calend</span><span style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>app</span>
                </Box>
                <Card className={classes.boxShadow} variant="outlined">
                    <CardContent>
                        <Container component="main">
                            <CssBaseline />
                            <div >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={5}>
                                        <Box mt={5}>
                                            <span style={{ fontSize: 18, fontWeight: "bold" }}>Your Google calendar is connected!</span>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        <Box mt={6}>
                                            <ProgressBar progress={50} />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box mt={4}>
                                    <Container>
                                        <Typography gutterBottom variant="body1">
                                            Here is how <span style={{ color: "#FF7E00", fontSize: "14px" }}>calend</span><span style={{ color: "black", fontSize: "14px" }}>app</span> will work with <span className={classes.boldFont}>{props.loginEmail}</span>:
                                            </Typography>
                                        <Divider variant="middle" className={classes.divider} />
                                        <Grid container>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="body1">
                                                    <p style={{ float: "left", paddingLeft: "10px" }}>1. We will check <span className={classes.boldFont}>{props.loginEmail}</span> for conflicts</p>
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography gutterBottom variant="body1">
                                                    <p style={{ fontSize: "14px", color: "silver", float: "right" }}>EDIT</p>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider variant="middle" className={classes.divider} />

                                        <Grid container>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="body1">
                                                    <p style={{ float: "left", paddingLeft: "10px" }}>2. We will add event to "<span className={classes.boldFont}>{props.loginEmail}</span>":</p>     </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography gutterBottom variant="body1">
                                                    <p style={{ fontSize: "14px", color: "silver", float: "right" }}>EDIT</p>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider variant="middle" className={classes.divider} />
                                    </Container>
                                </Box>
                                <Box className={classes.paper} mt={6}>
                                    <Button mt={8}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Continue
          </Button>

                                </Box>

                            </div>
                        </Container>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

