const sendPrompt = async (cssCode) => {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/Salesforce/codet5-base", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_TOKEN}`, // use environment variable
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Rewrite this CSS code to a dark theme using CSS variables:\n${cssCode}`,
      }),
    });

    const data = await response.json();

    // Safely handle both string or array response
    const transformedCSS = typeof data === "string" ? data : data?.generated_text || data[0]?.generated_text;

    if (!transformedCSS) {
      console.error("No transformed CSS returned:", data);
      return;
    }

    console.log("Transformed CSS:", transformedCSS);
    // Optionally store to state or update the UI
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
  }
};
