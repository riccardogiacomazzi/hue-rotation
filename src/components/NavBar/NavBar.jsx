import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ menuPages, savedFlashed, isSession, setIsSession }) => {
  const handleArchiveClick = () => {
    setIsSession(!isSession);
  };

  return (
    <div className="navbar">
      <Link to={"/"} className="home">
        <div className="text">HUE ROTATION</div>
      </Link>
      <div className="menu">
        {menuPages.map((item, index) => {
          const isArchive = item === "Archive";

          return (
            <Link
              to={item.toLowerCase()}
              className="menu-item"
              key={index}
              style={{ color: isArchive && savedFlashed && "#535bf2" }}
              onClick={isArchive ? handleArchiveClick : undefined}
            >
              {isArchive && savedFlashed ? "Saved" : item}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
