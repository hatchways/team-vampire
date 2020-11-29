import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
// import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
// import SignUpGoogle from './SignUpGoogle';
import { withStyles } from "@material-ui/core/styles";
// import LogIn from './Login';

const useStyles = theme => ({
  root: {
    width: 400,
    height: 500,
    margin: "auto",
    marginTop: 120,
    borderRadius: "2%",
    alignItems: "center"

  },
  button: {
    margin: theme.spacing(1)
  },
  box_Shadow: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    textAlign: "center"
  },
  bold_Font: {
    fontWeight: "bold"
  },
  decor: {
    textDecoration: "none"
  }
});

class SignUpEmail extends Component {
  render () {
    const { classes } = this.props;
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
                  onChange={this.props.handleEmailEntry}
                  // onChange={(e) => this.setState({ emailText: e.target.value })}
                />
                <Box mt={2}>
                  <Button mt={10}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    component={Link} to="/googleSignUp"
                    // onClick={handleSignUpEmail}
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
}

export default withStyles(useStyles)(SignUpEmail);
