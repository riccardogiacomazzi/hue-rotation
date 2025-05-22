import "./Info.css";

const Info = () => {
  return (
    <div className="info-text-container">
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
        <a href="https://github.com/riccardogiacomazzi/hue-rotation">github repository</a>
      </div>
    </div>
  );
};

export default Info;
