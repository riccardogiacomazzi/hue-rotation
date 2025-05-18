import "./Slider.css";
import { useState } from "react";

const Slider = ({ label }) => {
  const [value, setValue] = useState(50);

  const handleInteraction = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newValue = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setValue(newValue);
  };

  const handleDrag = (e) => {
    if (e.buttons === 1) handleInteraction(e);
  };

  return (
    <div className="grid-item" onMouseDown={handleInteraction} onMouseMove={handleDrag}>
      <div className="slider-label">{label}</div>
      <div className="slider-bar-container">
        <div className="slider-bar" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

export default Slider;
