import "./Archive.css";
import { useEffect, useState } from "react";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("cachedStyles");
    if (saved) {
      setCachedStyles(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="archive-grid">
      {cachedStyles.map((style, index) => {
        const randomHue = Math.floor(Math.random() * 360);

        return (
          <div
            key={index}
            className="archive-item"
            style={{
              ...style,
              animation: "none",
              filter: `hue-rotate(${randomHue}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Archive;
