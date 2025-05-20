import "./Slider.css";
import { useState, useRef } from "react";

const Slider = ({ label, value, onChange }) => {
  const lastInteractionRef = useRef(0);

  const handleInteraction = (e) => {
    const now = Date.now();
    if (now - lastInteractionRef.current < 500) return; // throttle: 500ms

    lastInteractionRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newValue = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleDrag = (e) => {
    if (e.buttons === 1) handleInteraction(e);
  };

  return (
    <div className="footer-item" onMouseDown={handleInteraction} onMouseMove={handleDrag}>
      <div className="slider-label">{label}</div>
      <div className="slider-bar-container">
        <div className="slider-bar" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

export default Slider;
