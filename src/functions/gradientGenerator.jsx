const gradientGenerator = (sliderValues) => {
  try {
    const [glow, drift, echo] = sliderValues ?? [];

    // Animation randomization (always runs)
    const duration = (Math.random() * 15 + 5).toFixed(2);
    const timingFunctions = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
    const timingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];

    // If all sliders are zero, return empty background with animation only
    if (glow === 0 && drift === 0 && echo === 0) {
      let result = {
        background: `radial-gradient(circle, hsl(200, 80%, 60%) ${Math.floor(
          Math.random() * 20
        )}%, hsl(260, 55%, 65%) ${Math.floor(Math.random() * (50 - 20 + 1)) + 20}%, hsl(360 100% 100%) ${Math.floor(
          Math.floor(Math.random() * (120 - 50 + 1)) + 50
        )}%)`,
        animation: `hueRotate ${duration}s ${timingFunction} infinite`,
        opacity: "0.75",
      };
      return result;
    }

    // Define color palette (H, S, L)
    const palette = [
      [195, 80, 70], // Blue
      [340, 80, 65], // Pink
      [175, 75, 50], // Teal
      [10, 80, 50], // Red-Orange
      [280, 60, 70], // Purple
    ];

    //Define blend style
    const blendStyles = [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
    ];

    const blendIndex = Math.floor(Math.random() * blendStyles.length);
    const blendSelect = blendStyles[blendIndex];

    // Decide number of colors based on echo (2 to 4)
    const numColors = Math.round(2 + (echo / 100) * 2);

    // Pick random unique colors from palette
    const chosenIndices = [];
    while (chosenIndices.length < numColors) {
      const idx = Math.floor(Math.random() * palette.length);
      if (!chosenIndices.includes(idx)) {
        chosenIndices.push(idx);
      }
    }

    // Use glow to adjust saturation contrast (how different saturation between colors)
    const glowFactor = (glow / 100) * 30; // max 30% saturation difference

    // Construct color stops
    // Positions controlled by drift (compressed or spread)
    const driftFactor = drift / 100;
    const positions = [];
    for (let i = 0; i < numColors; i++) {
      positions.push(Math.round((i / (numColors - 1)) * (70 + 30 * driftFactor)) + 15 * (1 - driftFactor));
      // positions between 15% and 100%, more spread as drift increases
    }

    // Build original and inverted color stops
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

    // Gradient type and position drift for radial gradients
    const total = Math.round(glow + drift + echo);

    const chosenType = total % 2 === 1 ? "linear" : "radial";

    const driftX = Math.random() * 40 + driftFactor * Math.random() * 20;
    const driftY = 40 + driftFactor * 20;
    const oppositeX = 100 - driftX;
    const oppositeY = 100 - driftY;

    let background;
    if (chosenType === "linear") {
      const angle = Math.floor(Math.random() * 360);
      background = `
      linear-gradient(${angle}deg, ${colorStops.join(", ")}),
      linear-gradient(${(angle + 180) % 360}deg, ${invertedColorStops.join(", ")})
    `;
    } else {
      const radialShapes = ["circle", "ellipse"];
      const chosenShape = radialShapes[Math.floor(Math.random() * radialShapes.length)];

      background = `
      radial-gradient(${chosenShape} at ${driftX}% ${driftY}%, ${colorStops.join(", ")}),
      radial-gradient(${chosenShape} at ${oppositeX}% ${oppositeY}%, ${invertedColorStops.join(", ")})
    `;
    }

    background = background.trim();

    const result = {
      background,
      animation: `hueRotate ${duration}s ${timingFunction} infinite`,
      opacity: "0.75",
      mixBlendMode: blendSelect,
    };

    if (!result.background) {
      console.warn("No background generated!", { sliderValues, result });
    }

    return result;
  } catch (error) {
    console.warn(error, sliderValues);
    return {
      background: "",
      animation: "none",
      opacity: "1",
      mixBlendMode: blendSelect,
    };
  }
};

export default gradientGenerator;
