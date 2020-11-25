import React, { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";

import UserProvider from "./contexts/UserProvider";

import SignUpEmail from './pages/SignUpEmail.js';
import SignUpGoogle from './pages/SignUpGoogle.js';
import LogIn from './pages/Login.js';
import Profile from './pages/Profile.js';

// Event Types
import EventTypes from './pages/dashboard/EventTypes';
import NewEventType from './pages/dashboard/NewEventType';


function App() {
  const [email, setEmail] = useState('');

  const handleEmailEntry = (e) => {
    setEmail(e.target.value)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Route path="/profile" component={Profile} />
          <Route exact path="/event_types" component={EventTypes} />
          <Route path="/event_types/new" component={NewEventType} />
        </UserProvider>
        <Route path="/login" component={LogIn} />
        <Route path="/googleSignUp" component={SignUpGoogle} email={email} />
        <Route exact path='/' component={SignUpEmail} handleEmailEntry={handleEmailEntry} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;