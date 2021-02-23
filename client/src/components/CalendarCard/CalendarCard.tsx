import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    addButton: {
      marginLeft: theme.spacing(2),
    },
  })
);

export default function Calendar({ title }: any) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.paper}>
        <Typography variant="h6" component="h1" align="center">
          {title}
        </Typography>
        <ul></ul>
      </Paper>
    </Grid>
  );
}

const menuData = [
  { day: "Monday", food: ["Thai Curry", "Pasta"] },
  { day: "Tuesday", food: ["Thai Curry", "Pasta"] },
  { day: "Wednesday", food: ["Thai Curry", "Pasta"] },
  { day: "Thursday", food: ["Thai Curry", "Pasta"] },
  { day: "Friday", food: ["Thai Curry", "Pasta"] },
  { day: "Saturday", food: ["Thai Curry", "Pasta"] },
  { day: "Sunday", food: ["Thai Curry", "Pasta"] },
];
