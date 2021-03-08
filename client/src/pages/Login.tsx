import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm/LoginForm";
import { AuthContext } from "../context/auth/AuthContext";
import { setAuthToken, customAxios } from "../services/setAuthToken";

// import CircularProgress from "@material-ui/core/CircularProgress";

export default function Login({ item }: any) {
  const { Auth, dispatchAuth } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [errorLoginMsg, setErrorLoginMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [ userId, setUserId ] = useState(null);

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
            localStorage.clear();
            dispatchAuth({ type: "LOGIN", payload: err.response.data });
          });
      }
    }
  }, [Auth.loggedIn, Auth.invalidToken, dispatchAuth, token]);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    await customAxios
      .post(`/user/login`, value)
      .then((res) => {
        localStorage.setItem("userId", res.data.user._id);
        setUserId(res.data.user._id);
      })
      .catch((err) => {
        setErrorLoginMsg("User name or password invalid!");
        setLoading(false);
      });
  };

  if (userId) {
    return <Redirect to="/mfauth" />;
  } else {
    return (
      <LoginForm
        handleSubmit={handleSubmit}
        errorLoginMsg={errorLoginMsg}
        loading={loading}
      />
    );
  }
}
