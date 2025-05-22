import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ menuPages, menuOpen, setMenuOpen }) => {
  return (
    <div className="navbar">
      <Link to={"/"} className="home">
        <div className="text">HUE ROTATION</div>
      </Link>
      <div className="menu">
        <div className="menu-item" style={{ color: menuOpen && "#747bff" }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuPages[0]}
        </div>
        {menuPages && menuPages[1] === "Archive" && (
          <Link to={menuPages[1].toLowerCase()} className="menu-item">
            {menuPages[1]}
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
