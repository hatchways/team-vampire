import React, { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";

import SignUpEmail from './components/SignUpEmail.js';
import SignUpGoogle from './components/SignUpGoogle.js';
// import SetUpOne from './components/dashboard.js';
import LogIn from './components/Login.js';


function App() {
  const [email, setEmail] = useState('');

  // const handleLogin = (route) => {

  // }

  const handleEmailEntry = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value)
  }


  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/googleSignUp">
            <SignUpGoogle email={email} />
          </Route>
          <Route path='/' >
            <SignUpEmail handleEmailEntry={handleEmailEntry} />
          </Route>
        </Switch>
      </BrowserRouter>

    </MuiThemeProvider>
  );


}

export default App;