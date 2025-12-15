import "./Archive.css";
import { useEffect, useState } from "react";
import { copyStyle } from "../../functions/htmlCopy.js";
import { copyJpeg } from "../../functions/jpegCopy.js";
import { getGradients } from "../../services/gradients.js";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);
  const [fullArchive, setFullArchive] = useState([]);
  const [jpegFlashed, setJpegFlashed] = useState([]);
  const [codeFlashed, setCodeFlashed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mouseOver, setMouseOver] = useState(false);

  const sortedArchive = fullArchive.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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

  const handleMouseOver = (index) => {
    setMouseOver(!mouseOver);
  };

  //retrieve gradients from database

  useEffect(() => {
    const fetchGradients = async () => {
      const data = await getGradients();
      setFullArchive(data);
      setLoading(false);
    };

    fetchGradients();
  }, [cachedStyles]);

  return (
    <div>
      <div className="full-archive-grid">
        {fullArchive.length === 0
          ? //skeleton during loading
            Array.from({ length: 30 }).map((_, index) => (
              <div key={index} className="full-archive-grid-item skeleton-item" />
            ))
          : //fullArchive sorted and mapped
            sortedArchive.map((item, index) => (
              <div key={index} className="full-archive-grid-item" onMouseOver={() => handleMouseOver(index)}>
                <div className="archive-html-wrapper" dangerouslySetInnerHTML={{ __html: item.html }}></div>
                <div className="timestamp">{item.timestamp}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Archive;
