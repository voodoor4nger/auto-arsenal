import { initGame, renderGame, updateGame, type GameState } from "./game";
import { FIXED_DT, MAX_FRAME_DT } from "./constants";

function setupCanvas(canvas: HTMLCanvasElement, state: GameState): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable");

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.viewport.width = w;
    state.viewport.height = h;
  };

  resize();
  window.addEventListener("resize", resize);

  return ctx;
}

function start(): void {
  const canvas = document.getElementById("game") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("#game canvas not found");

  const state = initGame({ width: window.innerWidth, height: window.innerHeight });
  const ctx = setupCanvas(canvas, state);

  let last = performance.now();
  let accumulator = 0;

  const frame = (now: number) => {
    let frameDt = (now - last) / 1000;
    last = now;
    if (frameDt > MAX_FRAME_DT) frameDt = MAX_FRAME_DT;

    accumulator += frameDt;
    while (accumulator >= FIXED_DT) {
      updateGame(state, FIXED_DT);
      accumulator -= FIXED_DT;
    }

    const alpha = accumulator / FIXED_DT;
    renderGame(ctx, state, alpha);

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

start();
