import type { GameState } from "./game";
import type { Enemy } from "./types";
import { DIRECTIONAL_WEIGHT, STATIONARY_THRESHOLD } from "./constants";

/**
 * Score every alive enemy by `distance * (1 + DIRECTIONAL_WEIGHT * angDelta/PI)`
 * relative to the player's current movement direction. Returns the lowest-score
 * enemy. Falls back to pure-nearest when the player is essentially stationary.
 */
export function pickPrimaryTarget(
  state: GameState,
  range?: number,
  exclude?: Set<number>
): Enemy | null {
  const ranked = scoredCandidates(state, range, exclude);
  if (ranked.length === 0) return null;
  let best = ranked[0];
  for (let i = 1; i < ranked.length; i++) {
    if (ranked[i].score < best.score) best = ranked[i];
  }
  return best.e;
}

/** Same scoring rule, returns the n lowest-score enemies in ascending order. */
export function pickPrimaryTargets(
  state: GameState,
  n: number,
  range?: number,
  exclude?: Set<number>
): Enemy[] {
  if (n <= 0) return [];
  const ranked = scoredCandidates(state, range, exclude);
  ranked.sort((a, b) => a.score - b.score);
  return ranked.slice(0, n).map((c) => c.e);
}

function scoredCandidates(
  state: GameState,
  range: number | undefined,
  exclude: Set<number> | undefined
): { e: Enemy; score: number }[] {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const vx = state.player.vel.x;
  const vy = state.player.vel.y;
  const speed = Math.hypot(vx, vy);
  const useDirectional = speed >= STATIONARY_THRESHOLD;
  const movementAngle = useDirectional ? Math.atan2(vy, vx) : 0;
  const r2 = range !== undefined ? range * range : Infinity;

  const out: { e: Enemy; score: number }[] = [];
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (exclude && exclude.has(e.id)) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 > r2) continue;
    const d = Math.sqrt(d2);
    let score: number;
    if (useDirectional) {
      const enemyAngle = Math.atan2(dy, dx);
      let delta = enemyAngle - movementAngle;
      if (delta > Math.PI) delta -= Math.PI * 2;
      else if (delta < -Math.PI) delta += Math.PI * 2;
      const ang = Math.abs(delta);
      score = d * (1 + DIRECTIONAL_WEIGHT * (ang / Math.PI));
    } else {
      score = d;
    }
    out.push({ e, score });
  }
  return out;
}
