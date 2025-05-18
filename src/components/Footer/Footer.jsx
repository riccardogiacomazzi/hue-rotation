import "./Footer.css";
import Slider from "./Slider/Slider";

const Footer = ({ gradientParameters }) => {
  return (
    <div className="footer">
      <div className="sliders-container">
        {gradientParameters &&
          gradientParameters.map((item, index) => (
            <Slider className="grid-item" key={index} label={item}>
              {item}
            </Slider>
          ))}
      </div>
    </div>
  );
};

export default Footer;
