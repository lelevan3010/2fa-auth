import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./Theme";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./context/auth/AuthContext";
import { PlantProvider } from "./context/plant/PlantContext";
import { HistoryProvider } from "./context/history/HistoryContext";

import Login from "./pages/Login";
import MFAuth from "./pages/MFAuth";
import Identify from "./pages/Identify";
import History from "./pages/History";
import SignUp from "./pages/SignUp";
import SignUpRedirect from "./pages/SignUpRedirect";
import NotFound from "./pages/404";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <PlantProvider>
          <HistoryProvider>
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/mfauth" component={MFAuth} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signup-redirect" component={SignUpRedirect} />
                <PrivateRoute path="/identify" component={Identify} />
                <PrivateRoute path="/history" component={History} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </HistoryProvider>
        </PlantProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
