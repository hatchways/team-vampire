import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
// import Dashboard from './dashboard';
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
    },
    decor: {
        textDecoration: "none"
    }
}));

export default function LogIn(props) {
    const classes = useStyles();
    const full = false;

    // const handleLogin = () => {
    // }


    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Box className={classes.center_Text} mb={5}>  <span style={{ color: "#FF7E00", fontWeight: "bold", fontSize: "18px" }}>calend</span><span style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>app</span>
                </Box>
                <Card className={classes.box_Shadow} variant="outlined">
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
                            // onChange={(e) => setLogInEmail(e.target.value)}
                            />
                            <Box mt={2}>
                                <Button mt={10}
                                    type="submit"
                                    fullWidth={full}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    // onClick={handleLogin}
                                    component={Link} to="/profile"

                                >
                                    Continue
          </Button>
                            </Box>
                        </div>
                    </Container>
                    <Box mt={4} p={3} pt={3} className={classes.footerStyle}>
                        <span className={classes.boldFont} style={{ fontSize: "12px" }}>Don't have an account? &nbsp;

                         <Link to="/" className={classes.decor}>
                                <span style={{ color: "#FF7E00", cursor: "pointer" }}>
                                    Sign Up
                            </span>
                            </Link>
                        </span>
                    </Box>
                </Card>
            </div>
        </div>
    );
}