import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ menuPages }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="navbar">
      <Link to={"/"} className="home">
        <div className="text">HUE ROTATION</div>
      </Link>
      <div className="menu">
        {menuPages &&
          menuPages.map((item, index) => (
            <Link to={item.toLowerCase()} className="menu-item" key={index}>
              {item}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
