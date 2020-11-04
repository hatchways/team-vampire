import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={SignUp} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
