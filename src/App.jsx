import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Archive from "./components/Archive/Archive";
import Info from "./components/Info/Info";
import gradientGenerator from "./functions/gradientGenerator";

function App() {
  const [allGeneratedStyles, setAllGeneratedStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState();
  const [loading, setLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 0, 0]);
  const [clickFlashed, setClickFlashed] = useState(false);

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
    if (allGeneratedStyles.length > 100) {
      sessionStorage.removeItem("cachedStyles");
      setAllGeneratedStyles([]);
    }
  }, [allGeneratedStyles]);

  const onSubmit = (sliderValues) => {
    setClickFlashed(true);
    setTimeout(() => setClickFlashed(false), 500);

    setLoading(true);
    const generatedStyle = gradientGenerator(sliderValues);
    const updatedStyles = [...allGeneratedStyles, generatedStyle];
    setAllGeneratedStyles(updatedStyles);

    setCurrentStyle(generatedStyle);
    sessionStorage.setItem("cachedStyles", JSON.stringify(updatedStyles));
    setLoading(false);
  };

  return (
    <div className="app-container">
      <Router>
        <div className="navbar-overlay">
          <NavBar menuPages={menuPages} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home currentStyle={currentStyle} sliderValues={sliderValues} onSubmit={() => onSubmit(sliderValues)} />

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
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
