import "./NavBar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const NavBar = ({ menuPages }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div>Gradient app</div>
      <div className="menu">
        {menuOpen === true &&
          menuPages &&
          menuPages.map((item, index) => (
            <div
              className="menu-item"
              key={index}
              style={{
                animationDelay: `${(menuPages.length - 1 - index) * 0.2}s`,
              }}
            >
              {item}
            </div>
          ))}

        <GiHamburgerMenu className="button" onClick={handleMenuClick} />
      </div>
    </div>
  );
};

export default NavBar;
