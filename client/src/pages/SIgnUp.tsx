import React, { useState } from "react";

import { customAxios } from "../services/setAuthToken";

import SignUpForm from "../components/SignUpForm/SignUpForm";
import { Redirect } from "react-router-dom";

const SignUp = () => {
  const [errorSignUpMsg, setErrorSignUpMsg] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handleSubmit = async (value: any) => {
    await customAxios
      .post("/user/signup", value)
      .then((res) => {
        setErrorSignUpMsg("");
        setShouldRedirect(true);
      })
      .catch((err) => {
        setErrorSignUpMsg(err.response.data.errors[0].msg);
      });
  };

  return (
    <React.Fragment>
      <SignUpForm handleSubmit={handleSubmit} errorSignUpMsg={errorSignUpMsg} />
      {shouldRedirect && <Redirect to="/signup-redirect" />}
    </React.Fragment>
  );
};

export default SignUp;
