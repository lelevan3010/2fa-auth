import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";

import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginForm: {
      display: "flex",
      flexDirection: "column",
      padding: 30,
    },
    loginInput: {
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: "green",
      color: "white",
    },
  })
);

export default function LoginForm({ item }: any) {
  const classes = useStyles();

  const handleSubmit = (value: any) => {
    console.log("login", value);
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className={classes.loginForm}>
          <Field
            component={TextField}
            variant="outlined"
            label="User name"
            name="username"
            type="text"
            required={true}
            className={classes.loginInput}
          />
          <Field
            component={TextField}
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            required={true}
            className={classes.loginInput}
          />
          <Button
            type="submit"
            className={classes.loginButton}
            disabled={isSubmitting}
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
}
