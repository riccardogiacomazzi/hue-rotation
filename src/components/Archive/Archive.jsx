import "./Archive.css";
import { useEffect, useState } from "react";

const Archive = () => {
  const [cachedStyles, setCachedStyles] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("cachedStyles");

    if (saved) {
      setCachedStyles(JSON.parse(saved));
    } else {
      setCachedStyles([
        {
          background:
            "radial-gradient(circle, hsl(200, 80%, 60%) 0%, hsl(260, 55%, 65%) 50%, hsl(360, 100%, 100%) 90%)",
        },
      ]);
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
