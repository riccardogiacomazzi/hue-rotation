import { useEffect, useState } from "react";
import "./Footer.css";
import Slider from "./Slider/Slider";

const Footer = ({ gradientParameters, onSubmit }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    console.log(seed);
  }, [seed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(seed);
    }
    setSeed("");
  };

  return (
    <div className="footer">
      <div className="sliders-container">
        {gradientParameters &&
          gradientParameters.map((item, index) => (
            <Slider className="grid-item" key={index} label={item}>
              {item}
            </Slider>
          ))}
        <form className="grid-item" onSubmit={handleSubmit}>
          <input className="input" placeholder="Seed" onChange={(e) => setSeed(e.target.value)}></input>
        </form>
      </div>
    </div>
  );
};

export default Footer;
