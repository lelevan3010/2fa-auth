import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <h1>
        Page not found!{" "}
        <span>
          <Link to="identify">Go back</Link>
        </span>
      </h1>
    </React.Fragment>
  );
};

export default NotFound;
