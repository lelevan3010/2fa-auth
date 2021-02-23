import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./Theme";

import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";

import Calendar from "./pages/Calendar";
import Dishes from "./pages/Dishes";
import ShoppingList from "./pages/ShoppingList";
import History from "./pages/History";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Switch>
            <Route exact path="/" component={Login} />
            <AppLayout>
              <Route path="/calendar" component={Calendar} />
              <Route path="/dishes" component={Dishes} />
              <Route path="/shopping-list" component={ShoppingList} />
              <Route path="/history" component={History} />
            </AppLayout>
          </Switch>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
