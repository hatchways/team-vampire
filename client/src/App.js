import React, { Fragment, useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";

import Header from "./components/Layout/Header";

import UserProvider from "./contexts/UserProvider";

import SignUpEmail from './pages/SignUpEmail.js';
import SignUpGoogle from './pages/SignUpGoogle.js';
import LogIn from './pages/Login.js';
import Profile from './pages/Profile.js';

// Event Types
import EventTypes from './pages/dashboard/EventTypes';
import NewEventType from './pages/dashboard/NewEventType';

// Exclude the Header on the SignUp/Login routes
const exclusionArray = [
  "/",
  "/login",
  "/googleSignUp"
];


function App() {
  const [email, setEmail] = useState('');

  const handleEmailEntry = (e) => {
    setEmail(e.target.value)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LogIn} />
            <Route path="/googleSignUp" component={SignUpGoogle} email={email} />
            <Route exact path="/" component={SignUpEmail} handleEmailEntry={handleEmailEntry} />
            <Fragment>
              <UserProvider>
                <Header />
                <Route path="/profile" component={Profile} />
                <Route path="/event_types/user/me" component={EventTypes} />
                <Route path="/event_types/new" component={NewEventType} />
              </UserProvider>
            </Fragment>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;