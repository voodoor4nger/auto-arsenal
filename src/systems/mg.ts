import type { GameState } from "../game";
import type { Enemy, Projectile } from "../types";
import { EVOLUTIONS, WEAPONS } from "../constants";
import { findMachineGunWeapon } from "../weapons";
import { pickPrimaryTarget } from "../targeting";

export function updateMachineGun(state: GameState, dt: number): void {
  const w = findMachineGunWeapon(state);
  if (!w) return;

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }

  const target = w.isPrimary ? pickPrimaryTarget(state) : nearestEnemy(state);

  if (w.evolved) {
    if (target) {
      w.noTargetTimer = 0;
      w.spinUp = Math.min(1, w.spinUp + dt / EVOLUTIONS.MG.SPIN_UP_DURATION);
    } else {
      w.noTargetTimer += dt;
      if (w.noTargetTimer > EVOLUTIONS.MG.NO_TARGET_GRACE) {
        w.spinUp = Math.max(0, w.spinUp - dt / EVOLUTIONS.MG.SPIN_DOWN_DURATION);
      }
    }
  }

  if (w.cooldownRemaining > 0) return;
  if (!target) return;

  const baseRate = w.fireRate;
  const baseSpread = w.spread;
  const effectiveRate = w.evolved
    ? baseRate + (EVOLUTIONS.MG.MAX_FIRE_RATE - baseRate) * w.spinUp
    : baseRate;
  const effectiveSpread = w.evolved ? baseSpread * (1 - w.spinUp) : baseSpread;

  if (effectiveRate <= 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const aim = Math.atan2(target.pos.y - py, target.pos.x - px);
  const offset = (Math.random() - 0.5) * effectiveSpread;
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

  w.cooldownRemaining = 1 / effectiveRate;
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
