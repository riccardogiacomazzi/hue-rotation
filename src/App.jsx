import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import { InferenceClient } from "@huggingface/inference";

function App() {
  const [count, setCount] = useState(0);
  const [generatedCSS, setGeneratedCSS] = useState("");

  const menuPages = ["Info", "Archive"];
  const gradientParameters = ["Vibrance", "Movement", "Clarity"];

  const client = new InferenceClient(import.meta.env.VITE_HUGGINGFACE_API_TOKEN);
  console.log(client);

  const onSubmit = async () => {
    try {
      const result = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct",
        messages: [
          {
            role: "assistant",
            content: `
            Return this code with every numerical value changed:
              background: radial-gradient(circle, hsl(200, 80%, 60%) 0%, hsl(260, 55%, 65%) 50%, hsl(360 100% 100%) 90%);
            Return this code with every numerical value changed:
              animation: hueRotate 10s linear infinite;            
                        `,
          },
        ],
      });
      console.log("Transformed CSS:", result.choices[0].message.content);
      setGeneratedCSS(result.choices[0].message.content);
    } catch (error) {
      console.error("Error from Hugging Face client:", error);
    }
  };

  return (
    <>
      <div className="app-container">
        <NavBar menuPages={menuPages} />
        <Home generatedCSS={generatedCSS} />
        <Footer gradientParameters={gradientParameters} onSubmit={onSubmit} />
      </div>
    </>
  );
}

export default App;
