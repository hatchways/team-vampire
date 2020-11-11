import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";

import SignUpEmail from './pages/SignUpEmail.js';
import SignUpGoogle from './pages/SignUpGoogle.js';
// import SetUpOne from './pages/dashboard.js';
import LogIn from './pages/Login.js';
import Profile from './pages/Profile.js';


function App() {
  const [email, setEmail] = useState('');

  const [initialData, setInitialData] = useState([{}]);

  useEffect(() => {
    fetch('/api').then(
      response => response.json()
    ).then(data => console.log(data));
  });

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
          <Route path="/profile">
            <Profile />
          </Route>
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