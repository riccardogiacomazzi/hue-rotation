import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ currentStyle, onSubmit }) => {
  const blendStyle = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
  ];

  const blendSelect = Math.floor(Math.random() * blendStyle.length);

  return (
    <div className="home-container">
      <div className="gradient-container" style={currentStyle} onClick={() => onSubmit()} />
      <div
        className="gradient-container-bottom"
        style={{ ...currentStyle, mixBlendMode: `${blendStyle[blendSelect]}` }}
        onClick={() => onSubmit()}
      />
    </div>
  );
};

export default Home;
