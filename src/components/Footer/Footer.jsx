import { useEffect, useState } from "react";
import "./Footer.css";
// import Slider from "./Slider/Slider";
import * as Slider from "@radix-ui/react-slider";

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
            <div className="footer-item">
              <div className="slider-label">{item}</div>
              <Slider.Root
                className="slider-root"
                defaultValue={[0]}
                max={100}
                step={1}
                onValueChange={(value) => handleSliderChange(index, value)}
                key={index}
              >
                <Slider.Track className="slider-track">
                  <div className="slider-bar" style={{ width: `${sliderValues[index]}%` }} />
                  <Slider.Range className="slider-range" />
                </Slider.Track>
                <Slider.Thumb className="slider-thumb" aria-label="Slider Thumb" />
              </Slider.Root>
            </div>

            // <Slider
            //   onChange={(value) => handleSliderChange(index, value)}
            //   className="footer-item"
            //   key={index}
            //   label={item}
            //   value={sliderValues[index]}
            // >
            //   {item}
            // </Slider>
          ))}
        <div
          className="footer-item"
          style={{ backgroundColor: clickFlashed ? "white" : "black", mixBlendMode: loading && "difference" }}
          onClick={(e) => handleSubmit(e, sliderValues)}
        >
          <div className="button-text">{clickFlashed ? "Generating" : "Generate"}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
