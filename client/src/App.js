import React, { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";

import SignUpEmail from './pages/SignUpEmail.js';
import SignUpGoogle from './pages/SignUpGoogle.js';
// import SetUpOne from './pages/dashboard.js';
import LogIn from './pages/Login.js';
import LogInGoogle from './pages/LoginGoogle.js';
import CreateURL from './pages/CreateURL.js';
import GoogleConnected from './pages/GoogleConnected';


function App() {

  //This will be removed before merge
  //=========================
  const [signUpEmail, setSignUpEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  const handleSignUpEmailEntry = (e) => {
    setSignUpEmail(e.target.value)
  }
  const handleLoginEmailEntry = (e) => {
    setLoginEmail(e.target.value)
  }
  //============================

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/create-url">
            <CreateURL />
          </Route>
          <Route path="/google-connected">
            <GoogleConnected loginEmail={loginEmail} />
          </Route>
          <Route path="/login">
            <LogIn handleEmailLogin={handleLoginEmailEntry} />
          </Route>
          <Route path="/login_google">
            <LogInGoogle loginEmail={loginEmail} />
          </Route>
          <Route path="/signUp_google">
            <SignUpGoogle signUpEmail={signUpEmail} />
          </Route>
          <Route path='/' >
            <SignUpEmail handleEmailEntry={handleSignUpEmailEntry} />
          </Route>
        </Switch>
      </BrowserRouter>

    </MuiThemeProvider>
  );


}

export default App;