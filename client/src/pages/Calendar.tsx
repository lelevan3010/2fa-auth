import React from "react";
import CalendarCard from "../components/CalendarCard/CalendarCard";
import CalendarForm from "../components/CalendarForm/CalendarForm";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Calendar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" align="center">
        Calendar
      </Typography>
      <CalendarForm />
      <div className={classes.root}>
        <Grid container spacing={3}>
          {daysOfWeek.map((day, index) => {
            return <CalendarCard key={index} title={day} />;
          })}
        </Grid>
      </div>
    </React.Fragment>
  );
}
