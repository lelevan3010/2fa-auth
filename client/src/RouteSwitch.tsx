import React from "react";
import { Switch, Route } from "react-router-dom";

import Calendar from "./pages/Calendar";
import Dishes from "./pages/Dishes";
import ShoppingList from "./pages/ShoppingList";
import History from "./pages/History";

const RouteSwitch = () => {
  return (
    <Switch>
      <Route path="/calendar">
        <Calendar />
      </Route>
      <Route path="/dishes">
        <Dishes />
      </Route>
      <Route path="/shopping-list">
        <ShoppingList />
      </Route>
      <Route path="/history">
        <History />
      </Route>
    </Switch>
  );
};

export default RouteSwitch;
