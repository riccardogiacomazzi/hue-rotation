const generateGradientData = (sliderValues) => {
  try {
    const [glow, drift, echo] = sliderValues ?? [];

    const duration = (Math.random() * 15 + 5).toFixed(2);
    const timingFunctions = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
    const timingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];

    const palette = [
      [195, 80, 70], // Blue
      [340, 80, 65], // Pink
      [175, 75, 50], // Teal
      [10, 80, 50], // Red-Orange
      [280, 60, 70], // Purple
    ];

    const blendStyles = [
      // "normal",
      "multiply",
      "screen",
      "overlay",
      // "darken",
      "lighten",
      // "color-dodge",
      // "color-burn",
      // "hard-light",
      "soft-light",
      "difference",
      // "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
    ];
    const blendMode = blendStyles[Math.floor(Math.random() * blendStyles.length)];

    const numColors = Math.round(2 + (echo / 100) * 2); // 2 to 4 colors
    const chosenIndices = [];
    while (chosenIndices.length < numColors) {
      const idx = Math.floor(Math.random() * palette.length);
      if (!chosenIndices.includes(idx)) chosenIndices.push(idx);
    }

    const glowFactor = (glow / 100) * 30; // saturation difference
    const driftFactor = drift / 100;

    const positions = [];
    for (let i = 0; i < numColors; i++) {
      positions.push(Math.round((i / (numColors - 1)) * (70 + 30 * driftFactor)) + 15 * (1 - driftFactor));
    }

    const colorStops = chosenIndices.map((idx, i) => {
      const [h, s, l] = palette[idx];
      const sat = Math.min(100, Math.max(0, s + (Math.random() * glowFactor * 2 - glowFactor)));
      return `hsl(${h}, ${sat.toFixed(1)}%, ${l}%) ${positions[i]}%`;
    });

    const invertedColorStops = chosenIndices.map((idx, i) => {
      const [h, s, l] = palette[idx];
      const invHue = (h + 180) % 360;
      const sat = Math.min(100, Math.max(0, s + (Math.random() * glowFactor * 2 - glowFactor)));
      return `hsl(${invHue}, ${sat.toFixed(1)}%, ${l}%) ${positions[i]}%`;
    });

    const total = Math.round(glow + drift + echo);
    const type = total % 2 === 1 ? "linear" : "radial";

    const angle = Math.floor(Math.random() * 360);
    const shape = type === "radial" ? ["circle", "ellipse"][Math.floor(Math.random() * 2)] : null;

    const driftX = Math.random() * 40 + driftFactor * Math.random() * 20;
    const driftY = 40 + driftFactor * 20;

    return {
      type,
      shape,
      angle,
      driftX,
      driftY,
      colorStops,
      invertedColorStops,
      blendMode,
      animation: {
        duration,
        timingFunction,
      },
    };
  } catch (error) {
    console.warn("Error generating gradient data", error);
    return null;
  }
};

export default generateGradientData;
