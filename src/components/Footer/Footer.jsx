import { useEffect, useState } from "react";
import "./Footer.css";
import Slider from "./Slider/Slider";

const Footer = ({ gradientParameters, onSubmit, loading }) => {
  const [promptValues, setPromptValues] = useState({
    sliders: [0, 0, 0],
  });

  useEffect(() => {
    console.log(promptValues.sliders);
  }, [promptValues]);

  const handleSliderChange = (index, value) => {
    console.log("change slider");

    setPromptValues((prev) => {
      const newSliders = [...prev.sliders];
      newSliders[index] = value;
      return {
        ...prev,
        sliders: newSliders,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(promptValues);
    }
  };

  return (
    <div className="footer">
      <div className="sliders-container">
        {gradientParameters &&
          gradientParameters.map((item, index) => (
            <Slider
              onChange={(value) => handleSliderChange(index, value)}
              className="grid-item"
              key={index}
              label={item}
              value2={promptValues.sliders[index]}
            >
              {item}
            </Slider>
          ))}
        <div
          className="grid-item"
          style={{ backgroundColor: loading ? "black" : "white", mixBlendMode: loading && "difference" }}
          onClick={handleSubmit}
        >
          {loading ? "Generating" : "Generate"}
        </div>
      </div>
    </div>
  );
};

export default Footer;
