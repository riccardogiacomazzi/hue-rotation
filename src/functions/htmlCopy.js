export const copyStyle = (index, archiveRef, handleCodeClick) => {
  console.log(index, archiveRef, handleCodeClick);

  handleCodeClick(index);
  const pairElement = archiveRef.current?.[index];
  if (!pairElement) return;

  const foreground = pairElement.querySelector(".gradient-container");
  const background = pairElement.querySelector(".gradient-container-bottom");

  if (!foreground || !background) return;

  const getFilteredStyle = (el) => {
    const style = el.style;
    const keys = ["background-image", "opacity", "mix-blend-mode", "filter"];
    return keys
      .map((key) => {
        const value = style.getPropertyValue(key);
        return value ? `${key}: ${value};` : "";
      })
      .filter(Boolean)
      .join(" ");
  };

  const foregroundStyle = getFilteredStyle(foreground);
  const backgroundStyle = getFilteredStyle(background);

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
    }
    .archive-pair {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .archive-item {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class="archive-pair">
    <div class="archive-item" style="${backgroundStyle}"></div>
    <div class="archive-item" style="${foregroundStyle}"></div>
  </div>
</body>
</html>
`.trim();

  navigator.clipboard.writeText(htmlContent).catch((err) => {
    console.error("Failed to copy HTML", err);
  });
};
