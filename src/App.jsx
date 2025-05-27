import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Archive from "./components/Archive/Archive";
import Info from "./components/Info/Info";

import generateGradientData from "./functions/generateGradientData";
import renderGradientStyle from "./functions/renderGradientStyle";

function App() {
  const [allGeneratedStyles, setAllGeneratedStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({
    background: "radial-gradient(circle, hsl(200, 80%, 60%) 0%, hsl(260, 55%, 65%) 50%, hsl(360 100% 100%) 90%)",
  });
  const [clickStyle, setClickStyle] = useState({});

  const [loading, setLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 0, 0]);
  const [clickFlashed, setClickFlashed] = useState(false);
  const [savedFlashed, setSavedFlashed] = useState(false);

  const menuPages = ["Info", "Archive"];
  const gradientParameters = ["Glow", "Drift", "Echo"];

  useEffect(() => {
    const savedStyles = sessionStorage.getItem("cachedStyles");
    if (savedStyles) {
      const parsedStyles = JSON.parse(savedStyles);
      setAllGeneratedStyles(parsedStyles);
    }
  }, []);

  //clean archive after X styles generated
  useEffect(() => {
    if (allGeneratedStyles.length > 25) {
      sessionStorage.removeItem("cachedStyles");
      setAllGeneratedStyles([]);
    }
  }, [allGeneratedStyles]);

  //generates new style
  const onSubmit = (sliderValues) => {
    setClickFlashed(true);
    setTimeout(() => setClickFlashed(false), 500);
    setLoading(true);

    const gradientData = generateGradientData(sliderValues);
    const style = renderGradientStyle(gradientData);

    setCurrentStyle(style);

    setLoading(false);
  };

  //onGradientClick -> saves to sessionStorage
  const onGradientClick = () => {
    setSavedFlashed(true);
    setTimeout(() => setSavedFlashed(false), 500);
  };

  //saves current gradient to sessionStorage on click
  useEffect(() => {
    if (!clickStyle || Object.keys(clickStyle).length === 0) return;
    const updatedStyles = [...allGeneratedStyles, clickStyle];
    setAllGeneratedStyles(updatedStyles);
    sessionStorage.setItem("cachedStyles", JSON.stringify(updatedStyles));
  }, [clickStyle]);

  return (
    <div className="app-container">
      <Router>
        <div className="navbar-overlay">
          <NavBar menuPages={menuPages} savedFlashed={savedFlashed} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home
                  currentStyle={currentStyle}
                  setCurrentStyle={setCurrentStyle}
                  setClickStyle={setClickStyle}
                  sliderValues={sliderValues}
                  onGradientClick={onGradientClick}
                />

                <div className="footer-overlay">
                  <Footer
                    sliderValues={sliderValues}
                    setSliderValues={setSliderValues}
                    gradientParameters={gradientParameters}
                    onSubmit={onSubmit}
                    loading={loading}
                    clickFlashed={clickFlashed}
                    setClickFlashed={setClickFlashed}
                  />
                </div>
              </>
            }
          />
          <Route path="/info" element={<Info currentStyle={currentStyle} />} />
          <Route path="/archive" element={<Archive clickStyle={{ clickStyle }} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
