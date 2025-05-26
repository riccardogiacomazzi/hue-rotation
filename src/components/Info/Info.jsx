import { useEffect } from "react";
import "./Info.css";

const Info = () => {
  return (
    <div className="info-text-container">
      <div className="info-text-wrapper">
        <div className="info-text">
          <p>
            HUE ROTATION is a lightweight web utility that generates and displays pure CSS code.
            <br /> Each gradient is algorithmically crafted in real time, influenced by the user's input.
            <br />
            <br /> What you see is never the same twice and every gradient is stored only in your browser's session.
            <br />
            Once you leave, it’s gone.
            <br />
            <br />
            HUE ROTATION is a space for anyone who needs a spark of visual inspiration.
            <br />
            It’s a quiet corner for generating ephemeral code you can use or let fade.
          </p>
          {/* <a href="https://github.com/riccardogiacomazzi/hue-rotation">github repository</a> */}
        </div>
      </div>
      <div className="info-visual-wrapper">
        <div
          className="info-visual-foreground"
          style={{
            background:
              "radial-gradient(at 11.661% 50.4%, rgb(230, 59, 26) 7.2%, rgb(194, 133, 224) 50.2%, rgb(237, 94, 142) 93.2%), radial-gradient(at 88.339% 49.6%, rgb(26, 195, 230) 7.2%, rgb(163, 224, 133) 50.2%, rgb(94, 237, 190) 93.2%)",
            animation: "12.55s ease 0s infinite normal none running hueRotate",
            filter: "hue-rotate(37deg)",
          }}
        />
        <div
          className="info-visual-background"
          style={{
            background:
              "radial-gradient(at 11.661% 50.4%, rgb(230, 59, 26) 7.2%, rgb(194, 133, 224) 50.2%, rgb(237, 94, 142) 93.2%), radial-gradient(at 88.339% 49.6%, rgb(26, 195, 230) 7.2%, rgb(163, 224, 133) 50.2%, rgb(94, 237, 190) 93.2%)",
            animation: "12.55s ease 0s infinite normal none running hueRotate",
            filter: "hue-rotate(237deg)",
            transform: "rotate(180deg)",
            mixBlendMode: "lighten",
          }}
        />
      </div>
    </div>
  );
};

export default Info;
