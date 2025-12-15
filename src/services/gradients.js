export async function postGradient({ html, timestamp }) {
  const url = "https://hue-rotation-backend.vercel.app/api/post";

  try {
    const response = await fetch(url, {
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
  const url = "https://hue-rotation-backend.vercel.app/api/get";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch gradients: ${response.statusText}`);
    }

    return await response.json(); // Assuming your backend returns JSON
  } catch (error) {
    console.error("getGradients error:", error);
    throw error;
  }
}
