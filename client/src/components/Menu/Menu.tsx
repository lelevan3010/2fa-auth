import React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HistoryIcon from "@material-ui/icons/History";

const icons = [
  <TodayIcon />,
  <FormatListBulletedIcon />,
  <FastfoodIcon />,
  <HistoryIcon />,
];

const listItemRoutes = ["/calendar", "/shopping-list", "/dishes", "/history"];

const Menu = () => (
  <div>
    <List>
      {["Calendar", "Shopping List", "Dishes", "History"].map((text, index) => (
        <Link
          key={index}
          to={listItemRoutes[index]}
          style={{ color: "unset", textDecoration: "unset" }}
        >
          <ListItem button key={text}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
);

export default Menu;
