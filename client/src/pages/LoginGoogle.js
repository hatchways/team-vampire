import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from "react-router-dom";
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
    },
    stylePtag: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 20,
        fontWeight: "bold"
    }
}));

export default function LogInGoogle(props) {
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

                            <Box className={classes.centerText}>
                                <p className={classes.stylePtag}>Welcome back,</p>
                                <p className={classes.stylePtag}>{props.loginEmail}</p>
                            </Box>
                            <Box mt={3} mb={7}>
                                <Button mt={10}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    component={Link} to="/create-url"
                                    startIcon={<VpnKeyIcon />}
                                >
                                    login with Google
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