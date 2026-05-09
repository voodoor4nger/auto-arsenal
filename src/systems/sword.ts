import type { GameState } from "../game";
import type { Enemy } from "../types";
import { STATIONARY_THRESHOLD, WEAPONS } from "../constants";
import { findSwordWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateSword(state: GameState, dt: number): void {
  const w = findSwordWeapon(state);
  if (!w) return;

  if (w.swingTtl > 0) w.swingTtl = Math.max(0, w.swingTtl - dt);

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }
  if (w.cooldownRemaining > 0) return;
  if (w.fireRate <= 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const vx = state.player.vel.x;
  const vy = state.player.vel.y;
  const speed = Math.hypot(vx, vy);
  let baseAngle: number;
  if (speed >= STATIONARY_THRESHOLD) {
    baseAngle = Math.atan2(vy, vx);
  } else {
    const target = nearestEnemy(state);
    if (!target) return;
    baseAngle = Math.atan2(target.pos.y - py, target.pos.x - px);
  }
  const arcRad = (w.arcAngle * Math.PI) / 180;
  const halfArc = arcRad * 0.5;

  w.swingFromAngle = baseAngle - halfArc;
  w.swingToAngle = baseAngle + halfArc;
  w.swingRange = w.range;
  w.swingTtl = WEAPONS.SWORD.SWING_DURATION;

  const r2 = w.range * w.range;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 > r2) continue;
    const enemyAngle = Math.atan2(dy, dx);
    let delta = enemyAngle - baseAngle;
    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;
    if (Math.abs(delta) > halfArc) continue;
    dealDamage(state, e, w.damage);
  }

  w.cooldownRemaining = 1 / w.fireRate;
}

function nearestEnemy(state: GameState): Enemy | null {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD2) {
      best = e;
      bestD2 = d2;
    }
  }
  return best;
}
