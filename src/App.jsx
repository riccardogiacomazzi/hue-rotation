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
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 0, 0]);

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
      console.log("Cleaning Archive");
      sessionStorage.removeItem("cachedStyles");
      setAllGeneratedStyles([]);
    }
  }, [allGeneratedStyles]);

  const onSubmit = (sliderValues) => {
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
          <NavBar menuPages={menuPages} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  {menuOpen && (
                    <div className="info-container">
                      <Info />
                    </div>
                  )}
                  <Home currentStyle={currentStyle} onSubmit={() => onSubmit(sliderValues)} />
                </div>
                <div className="footer-overlay">
                  <Footer
                    sliderValues={sliderValues}
                    setSliderValues={setSliderValues}
                    gradientParameters={gradientParameters}
                    onSubmit={onSubmit}
                    loading={loading}
                  />
                </div>
              </>
            }
          />

          <Route
            path="/archive"
            element={
              <>
                {menuOpen && (
                  <div className="info-container">
                    <Info />
                  </div>
                )}
                <Archive />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
