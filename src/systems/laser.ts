import type { GameState } from "../game";
import type { Enemy } from "../types";
import { WEAPONS } from "../constants";
import { findLaserWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateLaser(state: GameState, dt: number): void {
  for (const beam of state.laserBeams) beam.ttl -= dt;
  if (state.laserBeams.some((b) => b.ttl <= 0)) {
    state.laserBeams = state.laserBeams.filter((b) => b.ttl > 0);
  }

  const w = findLaserWeapon(state);
  if (!w) return;

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }
  if (w.cooldownRemaining > 0) return;
  if (w.fireRate <= 0) return;

  const targets = nearestEnemies(state, w.beamCount);
  if (targets.length === 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const reach = WEAPONS.LASER.BEAM_LENGTH;
  const halfWidth = w.beamWidth * 0.5;

  for (const t of targets) {
    const dx = t.pos.x - px;
    const dy = t.pos.y - py;
    const len = Math.hypot(dx, dy) || 1;
    const ex = px + (dx / len) * reach;
    const ey = py + (dy / len) * reach;

    state.laserBeams.push({
      start: { x: px, y: py },
      end: { x: ex, y: ey },
      ttl: WEAPONS.LASER.BEAM_TTL,
      ttlMax: WEAPONS.LASER.BEAM_TTL,
    });

    for (const e of state.enemies) {
      if (!e.alive) continue;
      const reach2 = (halfWidth + e.radius) * (halfWidth + e.radius);
      if (distSqPointSegment(e.pos.x, e.pos.y, px, py, ex, ey) > reach2) continue;
      dealDamage(state, e, w.damage);
    }
  }

  w.cooldownRemaining = 1 / w.fireRate;
}

function nearestEnemies(state: GameState, n: number): Enemy[] {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const candidates: { e: Enemy; d2: number }[] = [];
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    candidates.push({ e, d2: dx * dx + dy * dy });
  }
  candidates.sort((a, b) => a.d2 - b.d2);
  return candidates.slice(0, n).map((c) => c.e);
}

function distSqPointSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq < 1e-9) {
    const ex = px - ax;
    const ey = py - ay;
    return ex * ex + ey * ey;
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  const ex = px - cx;
  const ey = py - cy;
  return ex * ex + ey * ey;
}
