import type { GameState } from "../game";
import type { Enemy, Rocket } from "../types";
import { WEAPONS } from "../constants";
import { findRocketLauncherWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateRockets(state: GameState, dt: number): void {
  const w = findRocketLauncherWeapon(state);
  if (w) {
    if (w.cooldownRemaining > 0) {
      w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    } else if (w.fireRate > 0) {
      const target = nearestEnemy(state);
      if (target) {
        spawnRocket(state, w, target);
        w.cooldownRemaining = 1 / w.fireRate;
      }
    }
  } else if (state.rockets.length === 0) {
    return;
  }

  for (const r of state.rockets) {
    if (!r.alive) continue;

    if (r.exploded) {
      r.explosionTtl -= dt;
      if (r.explosionTtl <= 0) r.alive = false;
      continue;
    }

    r.prevPos.x = r.pos.x;
    r.prevPos.y = r.pos.y;
    r.pos.x += r.vel.x * dt;
    r.pos.y += r.vel.y * dt;

    r.ttl -= dt;
    if (r.ttl <= 0) {
      detonate(state, r, null);
      continue;
    }

    const hit = firstEnemyOverlap(state, r);
    if (hit) detonate(state, r, hit);
  }
}

function detonate(state: GameState, r: Rocket, hit: Enemy | null): void {
  if (hit) dealDamage(state, hit, r.impactDamage);
  const er2 = r.explosionRadius * r.explosionRadius;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - r.pos.x;
    const dy = e.pos.y - r.pos.y;
    if (dx * dx + dy * dy > er2) continue;
    dealDamage(state, e, r.explosionDamage);
  }
  r.exploded = true;
  r.explosionTtl = WEAPONS.ROCKET.EXPLOSION_TTL;
}

function firstEnemyOverlap(state: GameState, r: Rocket): Enemy | null {
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - r.pos.x;
    const dy = e.pos.y - r.pos.y;
    const rr = e.radius + r.radius;
    if (dx * dx + dy * dy <= rr * rr) return e;
  }
  return null;
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

function spawnRocket(
  state: GameState,
  w: { impactDamage: number; explosionDamage: number; explosionRadius: number; rocketSpeed: number },
  target: Enemy
): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const len = Math.hypot(dx, dy) || 1;
  state.rockets.push({
    kind: "rocket",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: { x: (dx / len) * w.rocketSpeed, y: (dy / len) * w.rocketSpeed },
    radius: WEAPONS.ROCKET.RADIUS,
    alive: true,
    impactDamage: w.impactDamage,
    explosionDamage: w.explosionDamage,
    explosionRadius: w.explosionRadius,
    ttl: WEAPONS.ROCKET.LIFETIME,
    exploded: false,
    explosionTtl: 0,
  });
}
