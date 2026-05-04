import type { GameState } from "../game";
import type { ExtractionZone } from "../types";
import {
  EXTRACT_INTERVAL,
  EXTRACT_MULTIPLIERS,
  EXTRACT_MULT_STEP_AFTER,
  EXTRACT_RADIUS,
  EXTRACT_SPAWN_DISTANCE,
  EXTRACT_WINDOW_DURATION,
} from "../constants";

export function getExtractMultiplier(windowIndex: number): number {
  if (windowIndex <= 0) return 0;
  if (windowIndex <= EXTRACT_MULTIPLIERS.length) {
    return EXTRACT_MULTIPLIERS[windowIndex - 1];
  }
  const last = EXTRACT_MULTIPLIERS[EXTRACT_MULTIPLIERS.length - 1];
  return last + (windowIndex - EXTRACT_MULTIPLIERS.length) * EXTRACT_MULT_STEP_AFTER;
}

export function nextWindowOpenTime(state: GameState): number {
  return EXTRACT_INTERVAL * state.nextExtractWindow;
}

export function updateExtraction(state: GameState, dt: number): boolean {
  if (state.extraction === null) {
    if (state.time >= EXTRACT_INTERVAL * state.nextExtractWindow) {
      state.extraction = spawnZone(state, state.nextExtractWindow);
      state.nextExtractWindow += 1;
    }
  }

  const zone = state.extraction;
  if (!zone) return false;

  zone.ttl -= dt;
  if (zone.ttl <= 0) {
    state.extraction = null;
    return false;
  }

  const dx = state.player.pos.x - zone.pos.x;
  const dy = state.player.pos.y - zone.pos.y;
  const r = zone.radius + state.player.radius;
  return dx * dx + dy * dy <= r * r;
}

function spawnZone(state: GameState, windowIndex: number): ExtractionZone {
  const angle = Math.random() * Math.PI * 2;
  const cx = state.player.pos.x + Math.cos(angle) * EXTRACT_SPAWN_DISTANCE;
  const cy = state.player.pos.y + Math.sin(angle) * EXTRACT_SPAWN_DISTANCE;
  return {
    pos: { x: cx, y: cy },
    radius: EXTRACT_RADIUS,
    ttl: EXTRACT_WINDOW_DURATION,
    ttlMax: EXTRACT_WINDOW_DURATION,
    windowIndex,
    multiplier: getExtractMultiplier(windowIndex),
  };
}
