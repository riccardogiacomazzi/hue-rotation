import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ currentStyle }) => {
  return (
    <div className="home-container">
      <div className="gradient-container" style={currentStyle}></div>
    </div>
  );
};

export default Home;
