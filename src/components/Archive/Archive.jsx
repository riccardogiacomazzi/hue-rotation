import "./Archive.css";
import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("cachedStyles");

    if (saved) {
      const parsed = JSON.parse(saved);
      setCachedStyles(parsed);
      setSliderValue(parsed.map(() => 0)); // Initialize slider values based on loaded styles
    } else {
      const defaultStyles = [
        {
          background:
            "radial-gradient(circle, hsl(200, 80%, 60%) 0%, hsl(260, 55%, 65%) 50%, hsl(360, 100%, 100%) 90%)",
        },
      ];
      setCachedStyles(defaultStyles);
      setSliderValue(defaultStyles.map(() => 0));
    }
  }, []);

  return (
    <div className="archive-grid">
      {cachedStyles.map((style, index) => (
        <div key={index} className="archive-pair">
          <div
            className="archive-item foreground"
            style={{
              ...style,
              animation: "none",
              filter: `hue-rotate(${sliderValue[index] || 0}deg)`,
              mixBlendMode: "",
            }}
          />
          <div
            className="archive-item background"
            style={{
              ...style,
              animation: "none",
              filter: `hue-rotate(${Math.floor(Math.random() * 360)}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Archive;
