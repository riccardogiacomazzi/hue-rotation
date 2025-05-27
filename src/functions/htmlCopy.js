export const copyStyle = (index, archiveRef, handleCodeClick) => {
  handleCodeClick(index);
  const pairElement = archiveRef.current?.[index];
  if (!pairElement) return;

  const foreground = pairElement.querySelector(".gradient-container");
  const background = pairElement.querySelector(".gradient-container-bottom");

  if (!foreground || !background) return;

  const getFilteredStyle = (el) => {
    const style = el.style;
    const keys = ["background-image", "opacity", "mix-blend-mode", "filter", "transform"];
    return keys
      .map((key) => {
        const value = style.getPropertyValue(key);
        return value ? `${key}: ${value};` : "";
      })
      .filter(Boolean)
      .join(" ");
  };

  const appendRotateToTransform = (styleStr, angle = "180deg") => {
    const transformRegex = /transform:\s*([^;]+);?/;
    const match = styleStr.match(transformRegex);
    if (match) {
      const newTransform = match[1] + ` rotate(${angle})`;
      return styleStr.replace(transformRegex, `transform: ${newTransform};`);
    } else {
      return styleStr + ` transform: rotate(${angle});`;
    }
  };

  const foregroundStyle = getFilteredStyle(foreground);
  const backgroundStyle = appendRotateToTransform(getFilteredStyle(background), "180deg");

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hue Rotation - ephemeral gradient generator - https://hue-rotation.web.app/</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .gradient-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .gradient {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class="gradient-container">
    <div class="gradient" style="${foregroundStyle}"></div>
    <div class="gradient" style="${backgroundStyle}"></div>
  </div>
</body>
</html>
`.trim();

  navigator.clipboard.writeText(htmlContent).catch((err) => {
    console.error("Failed to copy HTML", err);
  });
};
