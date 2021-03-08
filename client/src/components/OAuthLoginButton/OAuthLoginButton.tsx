import React from "react";

import Button from "@material-ui/core/Button";

function OAuthLoginButton({ name, background, icon, link }: any) {
  return (
    <Button
      style={{
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        backgroundColor: background,
        color: "white",
        textTransform: "none",
        height: 42,
      }}
    >
      <span
        style={{
          backgroundColor: "white",
          display: "flex",
          borderRadius: 3,
          marginLeft: "-21px",
        }}
      >
        <img
          style={{ margin: 7, height: 24 }}
          src={icon}
          alt={`login with ${name}`}
        />
      </span>
      <a
        style={{
          textDecoration: "none",
          color: "white",
          fontWeight: "bold",
          fontSize: 14,
        }}
        href={link}
      >
        Login with {name}
      </a>
    </Button>
  );
}

export default OAuthLoginButton;
