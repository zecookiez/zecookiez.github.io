// Seeded random number generator
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32((Date.now() / (1000 * 60 * 60 * 24)) | 0);

function getContentHeight() {
  const content = document.querySelector("#main-content");
  return content.offsetTop + content.offsetHeight;
}

function getContentWidth() {
  const content = document.querySelector("#main-content");
  return Math.max(window.innerWidth, content.offsetLeft + content.offsetWidth);
}

function randomSubtleGray() {
  const base = 160 + random() * 50;
  return `rgba(${base}, ${base}, ${base}, 0.3)`;
}

const svg = document.getElementById("svg-background");
// 40 pixels per point
const targetDensity = 40;
// 50 points per line
const pointsPerLine = 50;

function getLinesNeeded(pixelCount) {
  return (pixelCount / targetDensity / pointsPerLine) | 0;
}

const maxStep = 20;
let maxHeightDrawn = -1;
let maxWidthDrawn = -1;

function generateLines(cornerX, cornerY, dx, dy) {
  if (dx <= 0 || dy <= 0) {
    return;
  }

  let lineCount = getLinesNeeded(dx * dy);

  for (let i = 0; i < lineCount; i++) {
    let x = random() * dx + cornerX;
    let y = random() * dy + cornerY;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    const strokeWidth = (0.01 + random() * 1.2).toFixed(2);
    const strokeColor = randomSubtleGray();

    for (let j = 0; j < 50; j++) {
      const angle = random() * Math.PI * 2;
      const step = random() * maxStep;
      const dx = Math.cos(angle) * step;
      const dy = Math.sin(angle) * step;
      const cx = x + dx / 2 + (random() - 0.5) * 10;
      const cy = y + dy / 2 + (random() - 0.5) * 10;
      x += dx;
      y += dy;
      d += ` Q ${cx.toFixed(2)} ${cy.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)}`;
    }

    path.setAttribute("d", d);
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", strokeWidth);
    svg.appendChild(path);
  }
}

function generateLinesChunk() {
  let newHeight = getContentHeight();
  let newWidth = getContentWidth();

  let prevMaxHeight = maxHeightDrawn;
  let prevMaxWidth = maxWidthDrawn;

  let dy = newHeight - prevMaxHeight;
  let dx = newWidth - prevMaxWidth;

  // Draw in 3 areas
  generateLines(prevMaxWidth, 0, dx, prevMaxHeight);
  generateLines(0, prevMaxHeight, prevMaxWidth, dy);
  generateLines(prevMaxWidth, prevMaxHeight, dx, dy);

  maxHeightDrawn = newHeight;
  maxWidthDrawn = newWidth;
}

const container = document.getElementById("parallax-container");

window.addEventListener("load", () => {
  // Initial render:
  generateLinesChunk();

  container.style.height = `${maxHeightDrawn}px`;
});

window.addEventListener("resize", () => {
  generateLinesChunk();
  svg.setAttribute("viewBox", `0 0 ${maxWidthDrawn} ${maxHeightDrawn}`);
  container.style.height = `${maxHeightDrawn}px`;
});
