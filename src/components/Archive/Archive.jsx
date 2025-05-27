import "./Archive.css";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useRef } from "react";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);
  const [jpegFlashed, setJpegFlashed] = useState([]);
  const [codeFlashed, setCodeFlashed] = useState([]);

  const archiveRef = useRef([]);

  //loads styles on render
  useEffect(() => {
    const saved = sessionStorage.getItem("storedGradientHTMLArray");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCachedStyles(parsed);

      setJpegFlashed(parsed.map(() => false)); //initializes jpegButton status
      setCodeFlashed(parsed.map(() => false)); //initializes htmlButton status
    }
  }, []);

  //initializes buttons state at render and cachedStyle change

  const handleJpegClick = (index) => {
    setJpegFlashed((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setTimeout(() => {
      setJpegFlashed((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }, 500);
  };

  const handleCodeClick = (index) => {
    setCodeFlashed((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setTimeout(() => {
      setCodeFlashed((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }, 500);
  };

  //download div archive-pair as jpeg -> find out how to save both the layers!!!!!!!!!!!!!!!!!!

  //copy css style to clipboard

  return (
    <div className="archive-grid">
      {cachedStyles.map((style, index) => (
        <div key={index} className="archive-pair" ref={(el) => (archiveRef.current[index] = el)}>
          <div className="buttons-container">
            <div
              className="button"
              onClick={() => downloadAsJpeg(index)}
              style={{ backgroundColor: jpegFlashed[index] ? "black" : "white" }}
            >
              JPEG
            </div>
            <div
              className="button"
              onClick={() => copyStyle(index)}
              style={{ backgroundColor: codeFlashed[index] ? "black" : "white" }}
            >
              HTML
            </div>
          </div>
          {/* Generates visual based on received styles */}
          <div dangerouslySetInnerHTML={{ __html: style }} />
        </div>
      ))}
    </div>
  );
};

export default Archive;
