import html2canvas from "html2canvas";

export const copyJpeg = async (htmlString, index, handleJpegClick) => {
  handleJpegClick(index);

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "-10000px";
  wrapper.style.left = "-10000px";
  wrapper.style.width = "100vw";
  wrapper.style.height = "100vh";
  wrapper.style.zIndex = "-1";
  wrapper.style.display = "block";
  wrapper.style.overflow = "hidden";
  wrapper.style.background = "transparent";

  const tempContainer = document.createElement("div");
  tempContainer.style.width = "100vw";
  tempContainer.style.height = "100vh";
  tempContainer.innerHTML = htmlString;

  wrapper.appendChild(tempContainer);
  document.body.appendChild(wrapper);

  try {
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const canvas = await html2canvas(tempContainer, {
      useCORS: true,
      backgroundColor: null,
      scale: 5,
      logging: false,
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight,
    });

    const link = document.createElement("a");
    link.download = `Hue Rotation ${index}.jpeg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  } catch (err) {
    console.error("Error capturing from style HTML:", err);
  } finally {
    wrapper.remove();
  }
};
