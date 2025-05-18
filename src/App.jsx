import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  const menuPages = ["Info", "Archive"];
  const gradientParameters = ["Vibrance", "Movement", "Clarity"];

  return (
    <>
      <div className="app-container">
        <NavBar menuPages={menuPages} />
        <Home />
        <Footer gradientParameters={gradientParameters} />
      </div>
    </>
  );
}

export default App;
