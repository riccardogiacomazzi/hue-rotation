import "./Archive.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { copyStyle } from "../../functions/htmlCopy.js";
import { copyJpeg } from "../../functions/jpegCopy.js";

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

  return (
    <div className="archive-grid">
      {cachedStyles.length === 0 && (
        <div>
          <div className="info-text-container">
            <div className="info-text-wrapper">
              <div className="info-text" style={{ textAlign: "center" }}>
                <p>Click on a gradient to save it in the Archive</p>
                <p>The Archive stores 25 gradients, then it empties itself</p>
              </div>
            </div>
          </div>
          <div className="info-visual-wrapper">
            <div
              className="info-visual-foreground"
              style={{
                background:
                  "radial-gradient(at 11.661% 50.4%, rgb(230, 59, 26) 7.2%, rgb(194, 133, 224) 50.2%, rgb(237, 94, 142) 93.2%), radial-gradient(at 88.339% 49.6%, rgb(26, 195, 230) 7.2%, rgb(163, 224, 133) 50.2%, rgb(94, 237, 190) 93.2%)",
                animation: "25s ease 0s infinite normal none running hueRotate",
                filter: "hue-rotate(37deg)",
              }}
            />
            <div
              className="info-visual-background"
              style={{
                background:
                  "radial-gradient(at 11.661% 50.4%, rgb(230, 59, 26) 7.2%, rgb(194, 133, 224) 50.2%, rgb(237, 94, 142) 93.2%), radial-gradient(at 88.339% 49.6%, rgb(26, 195, 230) 7.2%, rgb(163, 224, 133) 50.2%, rgb(94, 237, 190) 93.2%)",
                animation: "40s ease 0s infinite normal none running hueRotate",
                filter: "hue-rotate(237deg)",
                transform: "rotate(180deg)",
                mixBlendMode: "lighten",
              }}
            />
          </div>
        </div>
      )}

      {cachedStyles.map((style, index) => (
        <div key={index} className="archive-pair">
          <div className="buttons-container">
            <div
              className="button"
              onClick={() => copyJpeg(cachedStyles[index], index, handleJpegClick)}
              style={{
                backgroundColor: jpegFlashed[index] ? "black" : "white",
                color: jpegFlashed[index] ? "white" : "black",
              }}
            >
              JPEG
            </div>
            <div
              className="button"
              onClick={() => copyStyle(index, archiveRef, handleCodeClick)}
              style={{
                backgroundColor: codeFlashed[index] ? "black" : "white",
                color: codeFlashed[index] ? "white" : "black",
              }}
            >
              {!codeFlashed[index] ? "HTML" : "COPIED"}
            </div>
          </div>
          <div
            style={{ height: "100vh", width: "100vw" }}
            className="archive-visual"
            ref={(el) => (archiveRef.current[index] = el)}
          >
            {/* Generates visual based on cached styles */}
            <div dangerouslySetInnerHTML={{ __html: style }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Archive;
