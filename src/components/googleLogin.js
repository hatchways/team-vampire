import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// import { Route, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
// import SignUpEmail from './SignUpEmail';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        height: 500,
        margin: "auto",
        marginTop: 120,
        borderRadius: "2%",
        alignItems: 'center',

    },
    box_Shadow: {
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
    center_Text: {
        textAlign: "center",
    },
    bold_Font: {
        fontWeight: "bold",
    }
}));

export default function LogIn(props) {
    const classes = useStyles();
    const full = false;
    const [logInEmail, setLogInEmail] = useState("");
    // const [show1stLoginDiv, setshow1stLoginDiv] = useState("block");
    // const [show2ndLoginDiv, setshow2ndLoginDiv] = useState("none");

    // const handleLogin = () => {
    //     if (logInEmail) {
    //         setshow1stLoginDiv("none");
    //         setshow2ndLoginDiv("block");
    //     }
    //     else {
    //         setshow1stLoginDiv("block");
    //         setshow2ndLoginDiv("none");
    //     }

    // }
    // const handleSignUpWithGoogle = () => {
    //     //Confirm then redirect to dashboard 1
    //     props.handleLogin("dash1");
    // }
    const logInFirstPage =
        <div style={{ display: "show1stLoginDiv" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Box>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Log into your account</span>
                    </Box>
                    <Box mt={4}>
                        <span style={{ fontSize: 12, fontWeight: "bold" }}>Enter email address to get started</span>
                    </Box>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setLogInEmail(e.target.value)}
                    />
                    <Box mt={2}>
                        <Button mt={10}
                            type="submit"
                            fullWidth={full}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        // onClick={handleLogin}

                        >
                            Continue
          </Button>
                    </Box>
                </div>
            </Container>
            <Box mt={4} p={3} pt={3} className={classes.footerStyle}>
                {/* <span className={classes.boldFont} style={{ fontSize: "12px" }}>Don't have an account? <span style={{ color: "#FF7E00", cursor: "pointer" }} onClick={() => props.handleLogin("SignUp")}>Sign Up</span></span> */}
            </Box>
        </div>
    const logInSecondPage =
        <div style={{ display: "show2ndLoginDiv" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Box className={classes.center_Text}>
                        <p style={{ fontSize: 18, fontWeight: "bold" }}>Welcome back, {logInEmail}!</p>
                        {/* <p style={{ fontSize: 18, fontWeight: "bold" }}>{logInEmail}!</p> */}
                    </Box>
                    <Box mt={2}>
                        <Button mt={10}
                            type="submit"
                            fullWidth={full}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            // onClick={handleSignUpWithGoogle}
                            startIcon={<VpnKeyIcon />}
                            size="large"
                        >
                            Login with Google
          </Button>
                    </Box>
                </div>
            </Container>
            <Box mt={4} p={3} pt={3} className={classes.footerStyle}>
                <span className={classes.bold_Font} style={{ fontSize: "14px", marginBottom: 0 }}>Don't have an account?

                {/* <Link to="/" className={classes.decor}>
                        <span style={{ color: "#FF7E00", cursor: "pointer", marginTop: 0 }} >
                            Sign up
                </span>
                    </Link>
                    <Route path="/"
                        render={props => {
                            return (
                                <SignUpEmail />
                            )
                        }}>
                    </Route> */}
                </span>
            </Box>
        </div>


    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Box className={classes.center_Text} mb={5}>  <span style={{ color: "#FF7E00", fontWeight: "bold", fontSize: "18px" }}>calend</span><span style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>app</span>
                </Box>
                <Card className={classes.box_Shadow} variant="outlined">
                    {logInFirstPage}
                    {logInSecondPage}
                </Card>
            </div>
        </div>
    );
}