import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ menuPages }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="navbar">
      <Link to={"/"} className="home">
        HUE ROTATION
      </Link>
      <div className="menu">
        {menuOpen === true &&
          menuPages &&
          menuPages.map((item, index) => (
            <Link
              to={item}
              className="menu-item"
              key={index}
              style={{
                animationDelay: `${(menuPages.length - 1 - index) * 0.2}s`,
              }}
            >
              {item}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
