// import React, { useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        height: 500,
        margin: "auto",
        marginTop: 120,
        borderRadius: "2%",
        // alignItems: 'center',

    },
    box_Shadow: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#FF7E00",
        padding: 15,
        paddingRight: 40,
        paddingLeft: 40,
        fontWeight: "bold",
        textTransform: "none"

    },
    footerStyle: {
        textAlign: "center",
        borderTop: "0.5px silver solid"
    },
    headerStyle: {
        borderBottom: "0.5px silver solid",
        textAlign: "left",
    },
    center_Text: {
        textAlign: "center",
    },
    bold_Font: {
        fontWeight: "bold",
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const full = false;
    return (
        <div className={classes.root}>
            <Box className={classes.center_Text} mb={5}>  <span style={{ color: "#FF7E00", fontWeight: "bold", fontSize: "18px" }}>calend</span><span style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>app</span>
            </Box>
            <Card className={classes.box_Shadow} variant="outlined">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Box className={classes.headerStyle} pb={5}>
                            <span style={{ fontSize: 26, fontWeight: "bold" }}>Welcome to Calend<span style={{ color: "#FF7E00" }}>App</span></span>
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
                        // onChange={(e) => setEmailText(e.target.value)}
                        />
                        <Box mt={4} className={classes.center_Text}>
                            <Button mt={10}
                                type="submit"
                                fullWidth={full}
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            // onClick={handleSignUp}
                            >
                                Continue
          </Button>
                        </Box>
                    </div>
                </Container>
                <Box mt={3} mb={3} p={3} pt={3} className={classes.center_Text}>
                    <span className={classes.boldFont} style={{ fontSize: "18px", color: "silver" }}>Set up later</span>
                </Box>
            </Card>

        </div>

    );
}