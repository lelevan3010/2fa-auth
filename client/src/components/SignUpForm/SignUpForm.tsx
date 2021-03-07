import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signUpForm: {
      display: "flex",
      flexDirection: "column",
      padding: 30,
    },
    signUpInput: {
      marginBottom: 20,
    },
    signUpButton: {
      backgroundColor: "#5373FF",
      color: "white",
    },
  })
);

function SignUpForm({ handleSubmit, errorSignUpMsg }: any) {
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      style={{
        alignSelf: "center",
        maxHeight: 500,
        maxWidth: 300,
        marginTop: "-100px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Create new account</h3>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={classes.signUpForm}>
            <Field
              component={TextField}
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              required={true}
              className={classes.signUpInput}
            />
            <Field
              component={TextField}
              variant="outlined"
              label="User name"
              name="username"
              type="text"
              required={true}
              className={classes.signUpInput}
            />
            <Field
              component={TextField}
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              required={true}
              className={classes.signUpInput}
            />
            <Button
              type="submit"
              className={classes.signUpButton}
              disabled={isSubmitting}
            >
              SignUp
            </Button>
          </Form>
        )}
      </Formik>
      <p style={{ color: "red", textAlign: "center", marginTop: "-10px" }}>
        {errorSignUpMsg}
      </p>
      <h4 style={{ textAlign: "center" }}>
        Have an account? <Link to="/">Log in</Link>
      </h4>
    </Paper>
  );
}

export default SignUpForm;
