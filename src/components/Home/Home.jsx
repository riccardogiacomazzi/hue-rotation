import "./Home.css";

const Home = ({ generatedCSS }) => {
  console.log(generatedCSS);

  // Extract background value using RegExp
  const backgroundMatch = generatedCSS?.match(/background:\s*([^;]+);/);
  const backgroundValue = backgroundMatch ? backgroundMatch[1].trim() : null;

  // (Optional) Extract animation if needed
  const animationMatch = generatedCSS?.match(/animation:\s*([^;]+);/s);
  const animationValue = animationMatch ? animationMatch[1].trim() : null;
  console.log(animationMatch);

  const style = {
    ...(backgroundValue && { background: backgroundValue }),
    ...(animationValue && { animation: animationValue }),
  };

  console.log("style: ", style);

  return (
    <div className="home-container">
      <div className="gradient-container" style={style}></div>
    </div>
  );
};

export default Home;
