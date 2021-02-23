import React from "react";

function LoginLayout({ children }: any) {
  return (
    <React.Fragment>
      <div>Login</div>
      {children}
    </React.Fragment>
  );
}

export default LoginLayout;
