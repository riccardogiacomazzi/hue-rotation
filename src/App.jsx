import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Archive from "./components/Archive/Archive"; // Make sure this exists
// import Info from "./components/Info/Info"; // Make sure this exists
import { InferenceClient } from "@huggingface/inference";
import promptInstructions from "./assets/promptInstructions";

function App() {
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [loading, setLoading] = useState(false);

  const menuPages = ["Info", "Archive"];
  const gradientParameters = ["Vibrance", "Movement", "Clarity"];

  const client = new InferenceClient(import.meta.env.VITE_HUGGINGFACE_API_TOKEN);

  const onSubmit = async (promptValues) => {
    setLoading(true);
    try {
      const result = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct",
        messages: [
          {
            role: "user",
            content: promptInstructions(
              promptValues.sliders[0],
              promptValues.sliders[2],
              promptValues.sliders[1]
            ).trim(),
          },
        ],
      });
      setGeneratedCSS(result.choices[0].message.content);
      console.log(result.choices[0].message.content);
    } catch (error) {
      console.error("Error from Hugging Face client:", error);
    } finally {
      setLoading(false);
    }
  };

  const [cachedStyles, setCachedStyles] = useState(() => {
    const saved = localStorage.getItem("cachedStyles");
    return saved ? JSON.parse(saved) : [];
  });

  // Extract background and animation
  const backgroundMatch = generatedCSS?.match(/background:\s*([^;]+);/);
  const animationMatch = generatedCSS?.match(/animation:\s*([^;]+);/s);

  const backgroundValue = backgroundMatch ? backgroundMatch[1].trim() : null;
  const animationValue = animationMatch ? animationMatch[1].trim() : null;

  const currentStyle = {
    ...(backgroundValue && { background: backgroundValue }),
    ...(animationValue && { animation: animationValue }),
  };

  // Update cache and trigger fade animation
  useEffect(() => {
    if (backgroundValue !== null && currentStyle) {
      const lastCached = cachedStyles.length > 0 ? cachedStyles[cachedStyles.length - 1] : null;
      const isSameStyle = lastCached && lastCached.background === currentStyle.background;

      if (!isSameStyle) {
        const updatedCache = [...cachedStyles, currentStyle];
        setCachedStyles(updatedCache);
        localStorage.setItem("cachedStyles", JSON.stringify(updatedCache));
      } else {
        console.log("Duplicate style, not storing.");
      }
    }
  }, [generatedCSS]);
  return (
    <div className="app-container">
      <Router>
        <NavBar menuPages={menuPages} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home generatedCSS={generatedCSS} currentStyle={currentStyle} />
                <Footer gradientParameters={gradientParameters} onSubmit={onSubmit} loading={loading} />
              </>
            }
          />
          <Route path="/archive" element={<Archive />} />
          {/* <Route path="/info" element={<Info />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
