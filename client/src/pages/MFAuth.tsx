import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import MfaForm from "../components/MfaForm/MfaForm";
import { AuthContext } from "../context/auth/AuthContext";
import { setAuthToken, customAxios } from "../services/setAuthToken";

export default function MFAuth({ item }: any) {
  const { Auth, dispatchAuth } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [errorLoginMsg, setErrorLoginMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrcodeURL, setQrcodeURL] = useState("");

  useEffect(() => {
    customAxios
        .get("user/mfa_qr_code", { 
          responseType: 'blob',
          params: {
            _id: localStorage.getItem("userId")
          }
        })
        .then((res) => {
            // return res.blob();
            setQrcodeURL(URL.createObjectURL(res.data));
        })
        .catch((err) => {
            console.log(err)
        });
  }, [Auth.loggedIn, Auth.invalidToken, dispatchAuth, token]);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    await customAxios
      .post(`user/verify_otp`, {...value, _id: localStorage.getItem("userId")})
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatchAuth({
          type: "LOGIN",
          payload: { Auth: { loggedIn: true } },
        });
      })
      .catch((err) => {
        setErrorLoginMsg("incorrect PIN!");
        setLoading(false);
      });
  };

    if (Auth.loggedIn) {
        return <Redirect to="/identify" />;
    } else {
        return <>
            <img style={{
                height: 200,
                position: "absolute",
                marginTop: 10
              }} alt="qr-code" src={qrcodeURL}
            />
            <MfaForm
                handleSubmit={handleSubmit}
                errorLoginMsg={errorLoginMsg}
                loading={loading}
            />
        </>
    }
}
