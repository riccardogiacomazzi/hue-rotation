import { useEffect, useState } from "react";
import "./Footer.css";
import Slider from "./Slider/Slider";

const Footer = ({ gradientParameters, onSubmit, loading }) => {
  const [sliderValues, setSliderValues] = useState([0, 0, 0]);
  const [clickFlashed, setClickFlashed] = useState(false);

  const handleSliderChange = (index, value) => {
    setSliderValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();

    if (!Array.isArray(values) || values.length !== 3) {
      console.warn("Invalid slider values:", values);
      return;
    }

    setClickFlashed(true);
    setTimeout(() => setClickFlashed(false), 500);

    onSubmit(values);
  };

  return (
    <div className="footer">
      <div className="sliders-container">
        {gradientParameters &&
          gradientParameters.map((item, index) => (
            <Slider
              onChange={(value) => handleSliderChange(index, value)}
              className="footer-item"
              key={index}
              label={item}
              value={sliderValues[index]}
            >
              {item}
            </Slider>
          ))}
        <div
          className="footer-item"
          style={{ backgroundColor: clickFlashed ? "black" : "white", mixBlendMode: loading && "difference" }}
          onClick={(e) => handleSubmit(e, sliderValues)}
        >
          {clickFlashed ? "Generating" : "Generate"}
        </div>
      </div>
    </div>
  );
};

export default Footer;
