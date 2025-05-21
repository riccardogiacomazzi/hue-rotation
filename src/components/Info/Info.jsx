import "./Info.css";

const Info = () => {
  return (
    <div className="info-text-container">
      <div className="info-text">
        <h2>HUE ROTATION</h2>
        <p>
          is a lightweight web utility that generates and displays pure CSS code.
          <br /> Each gradient is algorithmically crafted in real time, influenced by the user's input: no images, no
          fluff. <br />
          <br />
          <br /> What you see is never the same twice. <br /> Every gradient is stored only in your browser's session,
          meaning once you leave, it’s gone.
          <br />
          <br /> No accounts. No databases. Just transient colorfields, ephemeral by design.
          <br />
          <br />
          <br />
          HUE ROTATION is a space for anyone who needs a quick hit of visual inspiration without distraction. It's not a
          marketplace. It's not a toolchain. It’s a quiet corner for generating code you can use or let fade.
        </p>
        <a href="https://github.com/riccardogiacomazzi/hue-rotation">github repository</a>
      </div>
    </div>
  );
};

export default Info;
