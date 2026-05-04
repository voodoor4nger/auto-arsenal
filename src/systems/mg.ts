import type { GameState } from "../game";
import type { Enemy, Projectile } from "../types";
import { WEAPONS } from "../constants";
import { findMachineGunWeapon } from "../weapons";

export function updateMachineGun(state: GameState, dt: number): void {
  const w = findMachineGunWeapon(state);
  if (!w) return;

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }
  if (w.cooldownRemaining > 0) return;
  if (w.fireRate <= 0) return;

  const target = nearestEnemy(state);
  if (!target) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const aim = Math.atan2(target.pos.y - py, target.pos.x - px);
  const offset = (Math.random() - 0.5) * w.spread;
  const angle = aim + offset;

  const proj: Projectile = {
    kind: "projectile",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: { x: Math.cos(angle) * w.projectileSpeed, y: Math.sin(angle) * w.projectileSpeed },
    radius: WEAPONS.MG.PROJECTILE_RADIUS,
    alive: true,
    damage: w.damage,
    ttl: WEAPONS.MG.PROJECTILE_LIFETIME,
    pierceRemaining: 0,
    hitIds: [],
    homingStrength: 0,
  };
  state.projectiles.push(proj);

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
