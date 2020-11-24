// import React, { Component } from 'react';
import React, { useContext, useState } from 'react';
import UserProvider from "../contexts/UserProvider";
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import { Route, Link } from "react-router-dom";
// import Card from '@material-ui/core/Card';
// import { withStyles } from "@material-ui/core/styles";
// import CardContent from '@material-ui/core/CardContent';
// import ProgressBar from '../components/LinearProgress';

const useStyles = theme => ({
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
        paddingRight: 40,
        paddingLeft: 40,
        textTransform: "none",
    },
    center_Text: {
        textAlign: "center",
    },
    bold_Font: {
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
    small_Font: {
        fontSize: 10
    }

});

const Profile = () => {
    console.log(useContext(UserProvider.context));
    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    )
}

export default Profile


// class Profile extends Component {

//     render() {
//         const { classes } = this.props;
//         return (
//             <div className={classes.container}>
//                 <div className={classes.root}>
//                     <Box className={classes.center_Text} mb={5}>  <span style={{ color: "#FF7E00", fontWeight: "bold", fontSize: "18px" }}>calend</span><span style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>app</span>
//                     </Box>
//                     <Card className={classes.box_Shadow} variant="outlined">
//                         <CardContent>
//                             <Container component="main">
//                                 <CssBaseline />
//                                 <div >
//                                     <Grid container spacing={2}>
//                                         <Grid item xs={12} sm={5}>
//                                             <Box mt={5}>
//                                                 <span style={{ fontSize: 18, fontWeight: "bold" }}>Welcome to <span>Calend</span><span style={{ color: "#FF7E00" }}>App</span>!</span>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item xs={12} sm={7}>
//                                             <Box mt={6}>
//                                                 <ProgressBar />
//                                             </Box>
//                                         </Grid>
//                                     </Grid>
//                                     <Box mt={4}>
//                                         <Grid container spacing={0}>
//                                             <Grid item xs={12} sm={4}>
//                                                 <Box mt={4}>
//                                                     <span style={{ fontSize: 14, fontWeight: "bold" }}>Create your <span>Calend</span><span style={{ color: "#FF7E00" }}>App</span> URL:</span>
//                                                 </Box>
//                                             </Grid>
//                                             <Grid item xs={12} sm={8}>
//                                                 <Grid container spacing={0}>
//                                                     <Grid item xs={12} sm={5}>
//                                                         <TextField
//                                                             className={classes.small_Font}
//                                                             variant="outlined"
//                                                             margin="normal"
//                                                             size="small"
//                                                             disabled
//                                                             fullWidth
//                                                             placeholder="calendapp.com/"
//                                                         // onChange={(e) => this.setState({ emailText: e.target.value })}
//                                                         />
//                                                     </Grid>
//                                                     <Grid item xs={12} sm={7}>
//                                                         <TextField
//                                                             className={classes.small_Font}
//                                                             variant="outlined"
//                                                             margin="normal"
//                                                             size="small"
//                                                             required
//                                                             fullWidth
//                                                             name="email"
//                                                             autoComplete="email"
//                                                             onChange={this.props.handleEmailEntry}
//                                                         // onChange={(e) => this.setState({ emailText: e.target.value })}
//                                                         />
//                                                     </Grid>
//                                                 </Grid>
//                                             </Grid>
//                                         </Grid>

//                                         <Grid container spacing={0}>
//                                             <Grid item xs={12} sm={4}>
//                                                 <Box mt={3}>
//                                                     <span style={{ fontSize: 14, fontWeight: "bold" }}>Select your Time Zone: </span>
//                                                 </Box>
//                                             </Grid>
//                                             <Grid item xs={12} sm={8}>
//                                                 <Grid container spacing={0}>
//                                                     <Grid item xs={12} sm={5}>
//                                                         <TextField
//                                                             className={classes.small_Font}
//                                                             variant="outlined"
//                                                             margin="normal"
//                                                             size="small"
//                                                             fullWidth
//                                                             // label="calendapp.com/"
//                                                             placeholder="UTC Time"
//                                                         // onChange={(e) => this.setState({ emailText: e.target.value })}
//                                                         />
//                                                     </Grid>
//                                                     <Grid item xs={12} sm={7}>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Grid>
//                                         </Grid>
//                                         <Box className={classes.paper} mt={6}>
//                                             <Button mt={8}
//                                                 type="submit"
//                                                 variant="contained"
//                                                 color="primary"
//                                                 className={classes.submit}
//                                             // component={Link} to=""
//                                             // onClick={handleSignUpEmail}
//                                             >
//                                                 Continue
//           </Button>
//                                         </Box>
//                                     </Box>

//                                 </div>
//                             </Container>
//                             <Box mt={1} p={3} pt={2} className={classes.center_Text}>
//                                 <span style={{ fontSize: "14px", color: "silver" }}>Set up later
//                             </span>
//                             </Box>
//                         </CardContent>
//                     </Card>

//                 </div>
//             </div>
//         );
//     }
// }

// export default withStyles(useStyles)(Profile);
