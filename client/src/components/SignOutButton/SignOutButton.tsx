import React, { useContext } from "react";

import { AuthContext } from "../../context/auth/AuthContext";
import Button from "@material-ui/core/Button";

function SignOutButton() {
  const { dispatchAuth } = useContext(AuthContext);

  return (
    <Button
      style={{ backgroundColor: "#5373ff", color: "white" }}
      onClick={() => {
        localStorage.clear();
        dispatchAuth({
          type: "LOGOUT",
          payload: { Auth: { loggedIn: false } },
        });
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
