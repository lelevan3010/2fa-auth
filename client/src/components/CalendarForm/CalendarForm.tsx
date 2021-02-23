import React from "react";
import { Formik, Form } from "formik";

import SnackBar from "../SnackBar/SnackBar";
import { daysOfWeek } from "../../pages/Calendar";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export interface SnackbarMessage {
  message: string;
  key: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
    },
    toolbar: {
      padding: 20,
    },
    addButton: {
      height: 42,
      width: "100%",
    },
  })
);

const initialState = {
  day: "",
  food: [],
};

function CalendarForm() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // setState here
  const onUndo = () => {
    console.log("Undo action");
    handleClose();
  };

  // async function
  const handleSubmit = (values: any, { resetForm, setFieldValue }: any) => {
    handleClick();
    console.log("submited with data", values);
    resetForm(initialState);
    // values = initialState;
  };

  return (
    <React.Fragment>
      <Paper style={{ marginTop: 20, marginBottom: 20 }}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Formik initialValues={initialState} onSubmit={handleSubmit}>
            {({ handleChange, values, setFieldValue, resetForm }) => (
              <Form className={classes.form}>
                <Grid container spacing={3}>
                  <Grid item xs={4} md={3}>
                    <Autocomplete
                      size="small"
                      id="day-selector"
                      options={daysOfWeek}
                      getOptionLabel={(day: any) => day}
                      // value={daysOfWeek}
                      onChange={(e: any, value: any) => {
                        console.log(value);
                        setFieldValue(
                          "day",
                          value !== null ? value : initialState.day
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          name="day"
                          label="Day"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <Autocomplete
                      multiple
                      limitTags={3}
                      size="small"
                      id="food-selector"
                      options={food_list}
                      getOptionLabel={(food: any) => food}
                      onChange={(e: any, value: any) => {
                        console.log(value);
                        setFieldValue(
                          "food",
                          value !== null ? value : initialState.food
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          name="food"
                          label="Find food"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.addButton}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Toolbar>
      </Paper>
      <SnackBar open={open} handleClose={handleClose} onUndo={onUndo} />
    </React.Fragment>
  );
}

export default CalendarForm;

const food_list = [
  "Pasta",
  "Thai Curry",
  "Bun Rieu",
  "BBQ",
  "Fry wings",
  "Tom Yum",
  "Pho",
  "Steak",
];
