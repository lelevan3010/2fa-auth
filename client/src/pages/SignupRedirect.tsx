import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

const SignUpRedirect = () => {
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  setInterval(() => {
    setShouldRedirectToLogin(true);
  }, 4000);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <h4 style={{ alignSelf: "center" }}>
          Successfully sign up, redirect to login.{" "}
        </h4>
        <h4 style={{ alignSelf: "center" }}>
          Taking so long?
          <span>
            <Link to="/"> click here</Link>
          </span>
        </h4>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress
          size={40}
          style={{ color: "#5373FF", alignSelf: "center" }}
        />
      </div>
      {shouldRedirectToLogin && <Redirect to="/" />}
    </div>
  );
};

export default SignUpRedirect;
