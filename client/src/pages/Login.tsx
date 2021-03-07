import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm/LoginForm";
import { AuthContext } from "../context/auth/AuthContext";
import { setAuthToken, customAxios } from "../services/setAuthToken";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Login({ item }: any) {
  const { Auth, dispatchAuth } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [errorLoginMsg, setErrorLoginMsg] = useState("");

  useEffect(() => {
    if (!Auth.loggedIn) {
      if (token) {
        setAuthToken(token);
        customAxios
          .get("/user/check-auth-status", {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          })
          .then((res) => {
            dispatchAuth({ type: "LOGIN", payload: res.data });
          })
          .catch((err) => {
            dispatchAuth({ type: "LOGIN", payload: err.response.data });
          });
      }
    }
  }, [Auth.loggedIn, Auth.invalidToken, dispatchAuth, token]);

  const handleSubmit = async (value: any) => {
    await axios
      .post("http://localhost:3001/user/login", value)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatchAuth({
          type: "LOGIN",
          payload: { Auth: { loggedIn: true } },
        });
      })
      .catch((err) => {
        setErrorLoginMsg(err.response.data.message);
      });
  };

  if (Auth.loggedIn) {
    return <Redirect to="/identify" />;
  } else if (Auth.invalidToken) {
    return (
      <LoginForm handleSubmit={handleSubmit} errorLoginMsg={errorLoginMsg} />
    );
  } else if (token) {
    return (
      <CircularProgress
        size={100}
        style={{ color: "#5373FF", alignSelf: "center" }}
      />
    );
  } else {
    return <LoginForm handleSubmit={handleSubmit} />;
  }
}
