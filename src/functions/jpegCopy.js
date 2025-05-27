import * as htmlToImage from "html-to-image";

export const copyJpeg = async (htmlString, index, handleJpegClick) => {
  handleJpegClick(index);

  const waitForElement = (id, timeout = 2000) => {
    return new Promise((resolve, reject) => {
      const interval = 50;
      let elapsed = 0;
      const check = () => {
        const el = document.getElementById(id);
        if (el) return resolve(el);
        elapsed += interval;
        if (elapsed >= timeout) return reject(new Error(`Element #${id} not found in time`));
        setTimeout(check, interval);
      };
      check();
    });
  };

  try {
    const node = await waitForElement(`archive-visual-${index}`);
    const width = node.offsetWidth;
    const height = node.offsetHeight;

    const dataUrl = await htmlToImage.toJpeg(node, { quality: 0.97, width, height, pixelRatio: 2 });

    // Get current date/time
    const now = new Date();

    // Format as HHMMDDMMYY
    const pad = (num) => num.toString().padStart(2, "0");
    const timestamp =
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds()) +
      pad(now.getDate()) +
      pad(now.getMonth() + 1) + // Months are 0-based
      now.getFullYear().toString().slice(-2);

    const filename = `Hue Rotation_${timestamp}.jpeg`;

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("Error generating JPEG");
  }
};
