import React from "react";
import Logo from "../images/logo.svg";

export default function Navbar() {
  return (
    <div className="d-flex justify-content-between" style={{ height: 40 }}>
      <img src={Logo} className="header__logo" />
      <div className="navlink">
        <a href="#">SignUp</a> <a href="#">Login</a>
      </div>
    </div>
  );
}
