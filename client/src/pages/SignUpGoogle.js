import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
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
        paddingRight: 30,
        paddingLeft: 30,
        fontWeight: "bold",
        textTransform: "none"

    },
    footerStyle: {
        textAlign: "center",
        borderTop: "0.5px silver solid"
    },
    centerText: {
        textAlign: "center",
    },
    boldFont: {
        fontWeight: "bold",
    }
}));


export default function SignUpGoogle(props) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Box className={classes.centerText} mb={5}>  <span style={{ color: "#FF7E00", fontWeight: "bold", fontSize: "18px" }}>calend</span><span style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>app</span>
                </Box>
                <Card className={classes.boxShadow} variant="outlined">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>

                            <Box>
                                <span style={{ fontSize: 18, fontWeight: "bold" }}>Hi {props.signUpEmail}!</span>
                            </Box>
                            <Box className={classes.centerText} mt={4} style={{ fontSize: 14 }}>
                                <p >The easiest way is for you to sign up is with Google.</p>
                                <p> This will automatically connect your calendar so you</p>
                                <p> can start using <span className={classes.boldFont}>Calend<span style={{ color: "#FF7E00" }}>App</span></span> right away!</p>
                            </Box>
                            <Box mt={2}>
                                <Button mt={10}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    startIcon={<VpnKeyIcon />}
                                    size="large"
                                >
                                    Sign up with Google
          </Button>
                            </Box>
                        </div>
                    </Container>
                    <Box mt={4} p={3} pt={3} className={classes.footerStyle}>
                        <p className={classes.boldFont} style={{ fontSize: "14px", marginBottom: 0 }}>Prefer to create an account with password? </p>
                        <p className={classes.boldFont} style={{ color: "#FF7E00", cursor: "pointer", marginTop: 0 }} >click here</p>
                    </Box>
                </Card>

            </div>
        </div>
    );
}
