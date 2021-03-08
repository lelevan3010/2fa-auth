import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mfaForm: {
      display: "flex",
      flexDirection: "column",
    },
    loginInput: {
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: "#5373FF",
      color: "white",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: 14,
    },
  })
);

function MfaForm({ handleSubmit, errorLoginMsg, loading }: any) {
  const classes = useStyles();
  let redirectURI;
  if (process.env.NODE_ENV === "production") {
    redirectURI = "https://knowyourplant.herokuapp.com";
  } else {
    redirectURI = "http://localhost:3001";
  }
  
  return (
    <Paper
      elevation={3}
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        maxWidth: 300,
        marginTop: "-100px",
        padding: "0 30px",
        transform: "translateY(50px)",
      }}
    >
      {loading && (
        <LinearProgress
          color="secondary"
          style={{ borderRadius: 6, margin: "0 -30px" }}
        />
      )}
      <h3 style={{ textAlign: "center" }}>Enter PIN code</h3>
      <Formik
        initialValues={{ logUsername: "", logPassword: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={classes.mfaForm}>
            <Field
              component={TextField}
              variant="outlined"
              label="PIN code"
              name="code"
              type="text"
              required={true}
              className={classes.loginInput}
            />
            <Button
              type="submit"
              className={classes.loginButton}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <p style={{ color: "red", textAlign: "center", marginBottom: 0 }}>
        {errorLoginMsg}
      </p>
    </Paper>
  );
}

export default MfaForm;
