// Description: Custom cursor
type Options = {
  diameter?: number;
  borderDiameter?: number;
  easingConstant?: number;
};

// Apply custom cursor
export function applyCustomCursor(options: Options = {}) {
  const { easingConstant = 6 } = options;
  // Create cursor and cursor border
  const { cursor, cursorBorder } = createCursorAndCursorBorder(options);
  document.body.appendChild(cursor);
  document.body.appendChild(cursorBorder);

  // Cursor position and cursor border position
  const cursorPos = { x: 0, y: 0 };
  const cursorBorderPos = { x: 0, y: 0 };

  // Update cursor position on mousemove
  document.addEventListener("mousemove", (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Hide cursor
  const globalStyle = document.createElement("style");
  globalStyle.innerHTML = `* {cursor: none;}`;
  document.head.appendChild(globalStyle);

  // Easing animation for cursor border
  requestAnimationFrame(function loop() {
    cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easingConstant;
    cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easingConstant;
    cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
    requestAnimationFrame(loop);
  });
}

// create cursor and cursor border
function createCursorAndCursorBorder(options: Options) {
  const { diameter = 8, borderDiameter = 36 } = options;
  const cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  cursor.style.position = "fixed";
  cursor.style.boxSizing = "border-box";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "999999";
  cursor.style.width = `${diameter}px`;
  cursor.style.height = `${diameter}px`;
  cursor.style.borderRadius = "50%";
  cursor.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  cursor.style.left = `-${diameter / 2}px`;
  cursor.style.top = `-${diameter / 2}px`;

  const cursorBorder = document.createElement("div");
  cursorBorder.id = "custom-cursor-border";
  cursorBorder.style.position = "fixed";
  cursorBorder.style.boxSizing = "border-box";
  cursorBorder.style.pointerEvents = "none";
  cursorBorder.style.zIndex = "999999";
  cursorBorder.style.width = `${borderDiameter}px`;
  cursorBorder.style.height = `${borderDiameter}px`;
  cursorBorder.style.borderRadius = "50%";
  cursorBorder.style.border = "2px solid rgba(0, 0, 0, 0.5)";
  cursorBorder.style.left = `-${borderDiameter / 2}px`;
  cursorBorder.style.top = `-${borderDiameter / 2}px`;

  return { cursor, cursorBorder };
}
