const renderGradientStyle = (gradientData) => {
  if (!gradientData)
    return {
      background: "",
      animation: "none",
      opacity: "1",
      mixBlendMode: "normal",
    };

  const { type, shape, angle, driftX, driftY, colorStops, invertedColorStops, blendMode, animation } = gradientData;

  let background = "";

  if (type === "linear") {
    background = `
      linear-gradient(${angle}deg, ${colorStops.join(", ")}),
      linear-gradient(${(angle + 180) % 360}deg, ${invertedColorStops.join(", ")})
    `;
  } else {
    background = `
      radial-gradient(${shape} at ${driftX}% ${driftY}%, ${colorStops.join(", ")}),
      radial-gradient(${shape} at ${100 - driftX}% ${100 - driftY}%, ${invertedColorStops.join(", ")})
    `;
  }

  return {
    background: background.trim(),
    animation: `hueRotate ${animation.duration} ${animation.timingFunction} infinite`,
    opacity: "0.75",
    mixBlendMode: blendMode,
  };
};

export default renderGradientStyle;
