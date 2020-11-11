import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import { makeStyles } from "@material-ui/core/styles";



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
    },
    decor: {
        textDecoration: "none"
    }
}));


export default function SignUpEmail(props) {
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
                                <span style={{ fontSize: 18, fontWeight: "bold" }}>Sign up with <span>Calend</span><span style={{ color: "#FF7E00" }}>App</span></span>
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
                                onChange={props.handleEmailEntry}
                            />
                            <Box mt={2}>
                                <Button mt={10}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    component={Link} to="/signUp_google"
                                >
                                    Get Started
          </Button>

                            </Box>
                        </div>
                    </Container>
                    <Box mt={4} p={3} pt={3} className={classes.footerStyle}>
                        <span className={classes.boldFont} style={{ fontSize: "12px" }}>Already have an account? &nbsp;

                            <Link to="/login" className={classes.decor}>
                                <span style={{ color: "#FF7E00", cursor: "pointer" }}>
                                    Log in
                            </span>
                            </Link>
                        </span>
                    </Box>
                </Card>

            </div>
        </div>
    );
}
