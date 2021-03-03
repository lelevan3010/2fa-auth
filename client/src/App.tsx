import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./Theme";

import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { AuthProvider } from './context/auth/AuthContext'

import Calendar from "./pages/Calendar";
import Dishes from "./pages/Dishes";
import ShoppingList from "./pages/ShoppingList";
import History from "./pages/History";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <BrowserRouter>
            <Switch>
              <Switch>
                <Route exact path="/" component={Login} />
                <AppLayout>
                  <PrivateRoute path="/calendar" component={Calendar} />
                  <PrivateRoute path="/dishes" component={Dishes} />
                  <PrivateRoute path="/shopping-list" component={ShoppingList} />
                  <PrivateRoute path="/history" component={History} />
                </AppLayout>
              </Switch>
            </Switch>
          </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
