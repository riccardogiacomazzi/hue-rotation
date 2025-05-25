import "./Archive.css";
import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import html2canvas from "html2canvas";
import { useRef } from "react";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);
  const [sliderValue, setSliderValue] = useState([]);
  const [jpegFlashed, setJpegFlashed] = useState([]);
  const [codeFlashed, setCodeFlashed] = useState([]);

  const archiveRef = useRef([]);

  //loads styles on render
  useEffect(() => {
    const saved = sessionStorage.getItem("cachedStyles");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCachedStyles(parsed);
      setSliderValue(parsed.map(() => 0)); // Initialize slider values based on loaded styles
      setJpegFlashed(parsed.map(() => false)); //initializes jpegButton status
      setCodeFlashed(parsed.map(() => false));
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
  const downloadAsJpeg = (index) => {
    handleJpegClick(index);
    const pairElement = archiveRef.current?.[index];
    if (!pairElement) return;

    const visual = pairElement.querySelector(".archive-visual");
    if (!visual) return;

    html2canvas(visual, { useCORS: true, logging: false }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Hue Rotation ${index}.jpeg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    });
  };

  //copy css style to clipboard
  const copyStyle = (index) => {
    handleCodeClick(index);
    const pairElement = archiveRef.current?.[index];
    if (!pairElement) return;

    const foreground = pairElement.querySelector(".foreground");
    const background = pairElement.querySelector(".background");

    if (!foreground || !background) return;

    const getFilteredStyle = (el) => {
      const style = el.style;
      const keys = ["background-image", "opacity", "mix-blend-mode"];
      return keys
        .map((key) => {
          const value = style.getPropertyValue(key);
          return value ? `${key}: ${value};` : "";
        })
        .filter(Boolean)
        .join(" ");
    };

    const foregroundStyle = getFilteredStyle(foreground);
    const backgroundStyle = getFilteredStyle(background);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hue Rotation - ephemeral gradient generator</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .archive-pair {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .archive-item {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class="archive-pair">
    <div class="archive-item background" style="${backgroundStyle}"></div>
    <div class="archive-item foreground" style="${foregroundStyle}"></div>
  </div>
</body>
</html>
`.trim();

    navigator.clipboard
      .writeText(htmlContent)
      .then(() => {
        console.log("HTML copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy HTML", err);
      });
  };

  return (
    <div className="archive-grid">
      {cachedStyles.map((style, index) => (
        <div key={index} className="archive-pair" ref={(el) => (archiveRef.current[index] = el)}>
          <div className="buttons-container">
            <div
              className="button"
              onClick={() => downloadAsJpeg(index)}
              style={{ backgroundColor: jpegFlashed[index] ? "white" : "black" }}
            >
              JPEG
            </div>
            <div
              className="button"
              onClick={() => copyStyle(index)}
              style={{ backgroundColor: codeFlashed[index] ? "white" : "black" }}
            >
              HTML
            </div>
          </div>
          <div className="archive-visual">
            <div
              className="archive-item foreground"
              style={{
                ...style,
                animation: "none",
                filter: `hue-rotate(${sliderValue[index] || 0}deg)`,
                mixBlendMode: "",
              }}
            />
            <div
              className="archive-item background"
              style={{
                ...style,
                animation: "none",
                filter: `hue-rotate(${Math.floor(Math.random() * 360)}deg)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Archive;
