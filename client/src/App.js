import React, { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";

import UserProvider from "./contexts/UserProvider";

import SignUpEmail from './pages/SignUpEmail.js';
import SignUpGoogle from './pages/SignUpGoogle.js';
import LogIn from './pages/Login.js';
import Profile from './pages/Profile.js';


function App() {
  const [email, setEmail] = useState('');

  const handleEmailEntry = (e) => {
    setEmail(e.target.value)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Route path="/profile">
            <Profile />
          </Route>
        </UserProvider>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/googleSignUp">
          <SignUpGoogle email={email} />
        </Route>
        <Route exact path='/' >
          <SignUpEmail handleEmailEntry={handleEmailEntry} />
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;