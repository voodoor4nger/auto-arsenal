import type { GameState } from "../game";
import type { Enemy, PistolWeapon, Projectile } from "../types";
import {
  EVOLUTIONS,
  PROJECTILE_LIFETIME,
  PROJECTILE_RADIUS,
  WEAPON_RANGE,
} from "../constants";
import { findPistolWeapon } from "../weapons";
import { pickPrimaryTarget } from "../targeting";

export function updateWeapon(state: GameState, dt: number): void {
  const w = findPistolWeapon(state);
  if (!w) return;

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }
  if (w.cooldownRemaining > 0) return;
  if (w.fireRate <= 0) return;

  const target = w.isPrimary
    ? pickPrimaryTarget(state, WEAPON_RANGE)
    : findNearestEnemyInRange(state, WEAPON_RANGE);
  if (!target) return;

  fireAt(state, w, target);
  w.cooldownRemaining = 1 / w.fireRate;
}

function findNearestEnemyInRange(state: GameState, range: number): Enemy | null {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const r2 = range * range;
  let best: Enemy | null = null;
  let bestDist2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 <= r2 && d2 < bestDist2) {
      best = e;
      bestDist2 = d2;
    }
  }
  return best;
}

function fireAt(state: GameState, w: PistolWeapon, target: Enemy): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const baseAngle = Math.atan2(dy, dx);
  const spread = 0.18;
  const count = Math.max(1, w.projectileCount);

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1) - 0.5;
    const angle = baseAngle + t * spread * (count - 1);
    const vx = Math.cos(angle) * w.projectileSpeed;
    const vy = Math.sin(angle) * w.projectileSpeed;

    if (w.evolved) {
      const half = EVOLUTIONS.PISTOL.OFFSET / 2;
      const perpX = -Math.sin(angle);
      const perpY = Math.cos(angle);
      spawnProjectile(state, w, px + perpX * -half, py + perpY * -half, vx, vy);
      spawnProjectile(state, w, px + perpX * half, py + perpY * half, vx, vy);
    } else {
      spawnProjectile(state, w, px, py, vx, vy);
    }
  }
}

function spawnProjectile(
  state: GameState,
  w: PistolWeapon,
  x: number,
  y: number,
  vx: number,
  vy: number
): void {
  const proj: Projectile = {
    kind: "projectile",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: vx, y: vy },
    radius: PROJECTILE_RADIUS,
    alive: true,
    damage: w.damage,
    ttl: PROJECTILE_LIFETIME,
    pierceRemaining: w.pierce,
    hitIds: [],
    homingStrength: w.homingStrength,
  };
  state.projectiles.push(proj);
}
