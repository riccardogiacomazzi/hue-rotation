import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ currentStyle, onSubmit, sliderValues }) => {
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

  const getBlendMode = (sliders) => {
    const total = sliders.reduce((sum, value) => sum + value, 0);
    const maxSum = 300;
    const blendIndex = Math.floor((total / maxSum) * (blendStyle.length - 1));
    return blendIndex;
  };

  const [blendIndex, setBlendIndex] = useState(getBlendMode(sliderValues));
  const [hasSliderChanged, setHasSliderChanged] = useState(false);

  useEffect(() => {
    setBlendIndex(getBlendMode(sliderValues));
    getBlendMode(sliderValues);
  }, [sliderValues]);

  useEffect(() => {
    setBlendIndex(getBlendMode(sliderValues));
    setHasSliderChanged(true);
  }, [sliderValues]);

  const computedBlendMode = hasSliderChanged ? blendStyle[blendIndex] : currentStyle?.mixBlendMode;

  return (
    <div className="home-container">
      <div className="gradient-container" style={{ ...currentStyle, mixBlendMode: `` }} onClick={() => onSubmit()} />
      <div
        className="gradient-container-bottom"
        style={{
          ...currentStyle,
          mixBlendMode: computedBlendMode,
        }}
        onClick={() => onSubmit()}
      />
    </div>
  );
};

export default Home;
