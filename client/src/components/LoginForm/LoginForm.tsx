import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
      backgroundColor: "#5373FF",
      color: "white",
    },
  })
);

function LoginForm({ handleSubmit }: any) {
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      style={{ alignSelf: "center", maxHeight: 400, maxWidth: 300 }}
    >
      <h3 style={{ textAlign: "center" }}>Login to your account</h3>
      <Formik
        initialValues={{ logUsername: "", logPassword: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={classes.loginForm}>
            <Field
              component={TextField}
              variant="outlined"
              label="User name"
              name="logUsername"
              type="text"
              required={true}
              className={classes.loginInput}
            />
            <Field
              component={TextField}
              variant="outlined"
              label="Password"
              name="logPassword"
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
      <h4 style={{ textAlign: "center" }}>
        New member? <Link to="signup">Sign Up</Link>
      </h4>
    </Paper>
  );
}

export default LoginForm;
