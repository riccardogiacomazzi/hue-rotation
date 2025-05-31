export async function postGradient({ html, timestamp }) {
  try {
    const response = await fetch("https://hue-rotation-backend.onrender.com/api/gradients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html, timestamp }),
    });

    if (!response.ok) {
      throw new Error(`Failed to post gradient: ${response.statusText}`);
    }

    return await response.json(); // Or response.text(), depending on what your backend returns
  } catch (error) {
    console.error("postGradient error:", error);
    throw error;
  }
}

export async function getGradients() {
  try {
    const response = await fetch("https://hue-rotation-backend.onrender.com/api/gradients");

    if (!response.ok) {
      throw new Error(`Failed to fetch gradients: ${response.statusText}`);
    }

    return await response.json(); // Assuming your backend returns JSON
  } catch (error) {
    console.error("getGradients error:", error);
    throw error;
  }
}
