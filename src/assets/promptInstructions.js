const promptInstructions = (vibrance, clarity, movement) => {
  return `
You are a CSS generator. Do not explain anything. Do not say “Here is the CSS.” Do not use code blocks. Do not return any natural language. Just return valid CSS declarations directly.

Here are 2 sample styles:

background: linear-gradient(to right, hsl(H, S%, L%) P%, hsl(H, S%, L%) P%, hsl(H, S%, L%) P%);
animation: hueRotate DURATIONs EASING infinite;

background: radial-gradient(ellipse at center, hsl(H, S%, L%) P%, hsl(H, S%, L%) P%, hsl(H, S%, L%) P%);
animation: hueRotate DURATIONs EASING infinite;

Use these as reference. Now generate a new background and animation style based on the following inputs:

Vibrance=${vibrance} (0–100): affects saturation and lightness values in HSL colors as follows:
 • 0–33: saturation 40–60%, lightness 50–65%
 • 34–66: saturation 60–80%, lightness 60–75%
 • 67–100: saturation 80–100%, lightness 70–90%

Clarity=${clarity} (0–100): affects number of color stops and their position distribution:
 • 0–33: 2 color stops with distinct positions
 • 34–66: 3 to 5 color stops with balanced positions
 • 67–100: more than 5 color stops with smooth and close positions

Movement=${movement} (0–100): affects gradient type, animation duration, and easing:
 • 0–33: use linear-gradient, animation duration 4–8s, easing ease-in
 • 34–66: use radial-gradient(ellipse at center), animation duration 6–10s, easing ease-in-out
 • 67–100: use radial-gradient(circle) or conic-gradient, animation duration 8–12s, easing linear or steps(random steps count)

Output only valid CSS declarations, where H S L P are replaced by valid values.
`;
};

export default promptInstructions;
