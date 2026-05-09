export type InputState = {
  keys: Set<string>;
  justPressed: Set<string>;
  mouse: { x: number; y: number };
  mouseClicked: boolean;
};

export function createInput(): InputState {
  const input: InputState = {
    keys: new Set(),
    justPressed: new Set(),
    mouse: { x: 0, y: 0 },
    mouseClicked: false,
  };

  window.addEventListener("keydown", (e) => {
    if (!input.keys.has(e.code)) input.justPressed.add(e.code);
    input.keys.add(e.code);
    if (e.code === "Tab") e.preventDefault();
  });
  window.addEventListener("keyup", (e) => {
    input.keys.delete(e.code);
  });
  window.addEventListener("blur", () => {
    input.keys.clear();
    input.justPressed.clear();
  });

  window.addEventListener("mousemove", (e) => {
    input.mouse.x = e.clientX;
    input.mouse.y = e.clientY;
  });
  window.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    input.mouse.x = e.clientX;
    input.mouse.y = e.clientY;
    input.mouseClicked = true;
  });

  return input;
}

export function clearJustPressed(input: InputState): void {
  input.justPressed.clear();
  input.mouseClicked = false;
}

export function getMoveAxis(input: InputState): { x: number; y: number } {
  let x = 0;
  let y = 0;
  if (input.keys.has("KeyW") || input.keys.has("ArrowUp")) y -= 1;
  if (input.keys.has("KeyS") || input.keys.has("ArrowDown")) y += 1;
  if (input.keys.has("KeyA") || input.keys.has("ArrowLeft")) x -= 1;
  if (input.keys.has("KeyD") || input.keys.has("ArrowRight")) x += 1;
  if (x !== 0 && y !== 0) {
    const inv = 1 / Math.SQRT2;
    x *= inv;
    y *= inv;
  }
  return { x, y };
}
