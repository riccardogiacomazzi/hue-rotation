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

  const handleSliderChange = (index, value) => {
    setSliderValue((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value[0]; // value is an array, so take first element
      return newValues;
    });
  };

  return (
    <div className="archive-grid">
      {cachedStyles.map((style, index) => (
        <div key={index}>
          {/* <Slider.Root
            style={{ position: "absolute", marginBottom: "20" }}
            className="slider-root"
            defaultValue={[0]}
            max={360}
            step={1}
            value={[sliderValue[index] || 0]} // controlled slider
            onValueChange={(value) => handleSliderChange(index, value)}
          >
            <Slider.Track className="slider-track">
              <div className="slider-bar" style={{ width: `${sliderValue[index] || 0}%` }} />
              <Slider.Range className="slider-range" />
            </Slider.Track>
            <Slider.Thumb className="slider-thumb" aria-label="Slider Thumb" />
          </Slider.Root> */}

          <div
            className="archive-item"
            style={{
              ...style,
              animation: "none",
              filter: `hue-rotate(${sliderValue[index] || 0}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Archive;
