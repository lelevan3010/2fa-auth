import React from "react";
import Navbar from "../components/Navbar/Navbar";

function AppLayout({ children }: any) {
  return <Navbar>{children}</Navbar>;
}

export default AppLayout;
