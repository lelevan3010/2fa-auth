import React from "react";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";

import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <Paper
      elevation={3}
      style={{ alignSelf: "center", maxHeight: 400, maxWidth: 300 }}
    >
      <h3 style={{ textAlign: "center" }}>Login to your account</h3>
      <LoginForm />
      <h4 style={{ textAlign: "center" }}>
        New member? <Link to="signup">Sign Up</Link>
      </h4>
    </Paper>
  );
};

export default Login;
