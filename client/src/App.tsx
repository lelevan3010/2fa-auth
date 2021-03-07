import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./Theme";

import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./context/auth/AuthContext";
import { PlantProvider } from "./context/plant/PlantContext";

import Identify from "./pages/Identify";
import History from "./pages/History";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <PlantProvider>
          <CssBaseline />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <AppLayout>
                <PrivateRoute path="/identify" component={Identify} />
                <PrivateRoute path="/history" component={History} />
              </AppLayout>
            </Switch>
          </BrowserRouter>
        </PlantProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
