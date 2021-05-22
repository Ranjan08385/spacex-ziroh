import React from "react";
import "./Header.css";

const headerLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/2560px-SpaceX-Logo.svg.png";

function Header() {
  return (
    <div className="header">
      <img className="header__img" src={headerLogo} alt="" />
    </div>
  );
}

export default Header;
