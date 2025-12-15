import { useEffect, useRef, useState } from "react";
import "./Home.css";
import { postGradient, getGradients } from "../../services/gradients";

const Home = ({ currentStyle, setCurrentStyle, sliderValues, onGradientClick }) => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const handleClick = async () => {
    if (topRef.current && bottomRef.current) {
      const topHtml = topRef.current.outerHTML;
      const bottomHtml = bottomRef.current.outerHTML;

      const combinedHtml = `<div class="home-gradient-html">${topHtml}${bottomHtml}</div>`;
      let isInArchive;

      //check if current gradient already in archive
      try {
        const allGradients = await getGradients();
        isInArchive = allGradients.some((item) => item.html === combinedHtml);
      } catch (error) {
        console.log(error);
      }

      // saves in archive only if not already saved
      if (!isInArchive) {
        onGradientClick();
        try {
          await postGradient({
            html: combinedHtml,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const [glow, drift, echo] = sliderValues;

    const scale = 1 + drift / 200;
    const saturation = 1 + glow / 50;
    const blur = drift;
    const contrast = 1 + echo / 100;
    const hueRotate = ((glow + drift + echo) / 300) * 360;
    const topHue = currentStyle.hueRotate;
    const bottomHue = (topHue + 90) % 360;

    setCurrentStyle((prev) => ({
      ...prev,
      topScale: scale,
      bottomScale: scale * 2,
      saturation,
      blur,
      contrast,
      hueRotate,
      topHue,
      bottomHue,
    }));
  }, [sliderValues]);

  // build the filter strings
  const baseFilterTop = `saturate(${currentStyle.saturation}) blur(${currentStyle.blur}px) contrast(${currentStyle.contrast}) hue-rotate(${currentStyle.topHue}deg)`;
  const baseFilterBottom = `saturate(${currentStyle.saturation * 1.25}) blur(${currentStyle.blur / 2}px) contrast(${
    currentStyle.contrast * 1.25
  }) hue-rotate(${currentStyle.bottomHue}deg)`;

  return (
    <div className="home-container" onClick={handleClick}>
      <div
        className="gradient-container"
        style={{
          background: currentStyle.background,
          transform: `scale(${currentStyle.topScale || 1})`,
          filter: baseFilterTop,
        }}
        ref={topRef}
      />
      <div
        className="gradient-container-bottom"
        style={{
          background: currentStyle.background,
          mixBlendMode: currentStyle.mixBlendMode,
          transform: `scale(${currentStyle.bottomScale})`,
          filter: baseFilterBottom,
        }}
        ref={bottomRef}
      />
    </div>
  );
};

export default Home;
