import { useEffect, useState, useRef } from "react";
import "./Home.css";

const Home = ({ currentStyle, setClickStyle, sliderValues, onGradientClick }) => {
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

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setBlendIndex(getBlendMode(sliderValues));
    getBlendMode(sliderValues);
  }, [sliderValues]);

  useEffect(() => {
    setBlendIndex(getBlendMode(sliderValues));
    setHasSliderChanged(true);
  }, [sliderValues]);

  const computedBlendMode = hasSliderChanged ? blendStyle[blendIndex] : currentStyle?.mixBlendMode;

  //saves styles from DOM at click
  const handleClick = () => {
    onGradientClick();
    if (topRef.current && bottomRef.current) {
      const topStyle = getComputedStyle(topRef.current);
      const bottomStyle = getComputedStyle(bottomRef.current);

      const stylesToArchive = {
        topGradient: {
          background: topStyle.background,
          filter: topStyle.filter,
        },
        bottomGradient: {
          background: bottomStyle.background,
          mixBlendMode: bottomStyle.mixBlendMode,
          filter: bottomStyle.filter,
        },
      };

      setClickStyle(stylesToArchive);
    }
  };

  return (
    <div className="home-container" onClick={() => handleClick()}>
      <div
        className="gradient-container"
        style={{ background: currentStyle.background, animation: currentStyle.animation }}
        ref={topRef}
      />
      <div
        className="gradient-container-bottom"
        style={{
          background: currentStyle.background,
          animation: currentStyle.animation,
          mixBlendMode: computedBlendMode,
        }}
        ref={bottomRef}
      />
    </div>
  );
};

export default Home;
