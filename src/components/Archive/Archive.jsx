import "./Archive.css";
import { useEffect, useState } from "react";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cachedStyles");
    if (saved) {
      setCachedStyles(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="archive-grid">
      {cachedStyles.map((style, index) => {
        const randomHue = Math.floor(Math.random() * 360);
        console.log(style);

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
