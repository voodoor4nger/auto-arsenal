import type { GameState } from "../game";
import type { Enemy, RicochetProjectile, RicochetSpark } from "../types";
import { EVOLUTIONS, WEAPONS } from "../constants";
import { findRicochetWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateRicochet(state: GameState, dt: number): void {
  const w = findRicochetWeapon(state);
  if (w) {
    if (w.cooldownRemaining > 0) {
      w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    } else if (w.fireRate > 0) {
      const target = nearestEnemy(state, state.player.pos.x, state.player.pos.y);
      if (target) {
        spawnRicochetProjectile(state, w, target);
        w.cooldownRemaining = 1 / w.fireRate;
      }
    }
  } else if (state.ricochetProjectiles.length === 0 && state.ricochetSparks.length === 0) {
    return;
  }

  for (const p of state.ricochetProjectiles) {
    if (!p.alive) continue;

    p.prevPos.x = p.pos.x;
    p.prevPos.y = p.pos.y;

    // Trail sample
    p.trail.push({
      x: p.pos.x,
      y: p.pos.y,
      ttl: WEAPONS.RICOCHET.TRAIL_TTL,
      ttlMax: WEAPONS.RICOCHET.TRAIL_TTL,
    });
    for (const t of p.trail) t.ttl -= dt;
    while (p.trail.length > 0 && p.trail[0].ttl <= 0) p.trail.shift();

    p.pos.x += p.vel.x * dt;
    p.pos.y += p.vel.y * dt;

    p.ttl -= dt;
    if (p.ttl <= 0) {
      p.alive = false;
      continue;
    }

    const hit = firstHit(state, p);
    if (hit) {
      const dmg = computeBounceDamage(p);
      dealDamage(state, hit, dmg);
      p.hitIds.push(hit.id);
      addSpark(state, hit.pos.x, hit.pos.y);

      if (p.bouncesRemaining <= 0) {
        p.alive = false;
        continue;
      }

      const next = nearestEnemyInRange(state, hit.pos.x, hit.pos.y, p.searchRange, p.hitIds);
      if (!next) {
        p.alive = false;
        continue;
      }

      const dx = next.pos.x - hit.pos.x;
      const dy = next.pos.y - hit.pos.y;
      const len = Math.hypot(dx, dy) || 1;
      p.vel.x = (dx / len) * p.speed;
      p.vel.y = (dy / len) * p.speed;
      p.pos.x = hit.pos.x;
      p.pos.y = hit.pos.y;
      p.bouncesRemaining -= 1;
      p.bounceIndex += 1;
    }
  }

  for (const s of state.ricochetSparks) s.ttl -= dt;
  if (state.ricochetSparks.some((s) => s.ttl <= 0)) {
    state.ricochetSparks = state.ricochetSparks.filter((s) => s.ttl > 0);
  }
}

function computeBounceDamage(p: RicochetProjectile): number {
  if (!p.evolved || p.damagePerBounceMult <= 0) return p.damage;
  const mult = Math.pow(1 + p.damagePerBounceMult, p.bounceIndex);
  return p.damage * mult;
}

function spawnRicochetProjectile(
  state: GameState,
  w: ReturnType<typeof findRicochetWeapon> & object,
  target: Enemy
): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const len = Math.hypot(dx, dy) || 1;
  const speed = w.projectileSpeed;
  const proj: RicochetProjectile = {
    kind: "ricochetProjectile",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: { x: (dx / len) * speed, y: (dy / len) * speed },
    radius: WEAPONS.RICOCHET.PROJECTILE_RADIUS,
    alive: true,
    damage: w.damage,
    speed,
    bouncesRemaining: w.bounceCount,
    bounceIndex: 0,
    searchRange: w.bounceSearchRange,
    hitIds: [],
    ttl: WEAPONS.RICOCHET.PROJECTILE_LIFETIME,
    evolved: w.evolved,
    damagePerBounceMult: w.evolved ? EVOLUTIONS.RICOCHET.DAMAGE_PER_BOUNCE : 0,
    trail: [],
  };
  state.ricochetProjectiles.push(proj);
}

function addSpark(state: GameState, x: number, y: number): void {
  const s: RicochetSpark = {
    pos: { x, y },
    ttl: WEAPONS.RICOCHET.SPARK_TTL,
    ttlMax: WEAPONS.RICOCHET.SPARK_TTL,
  };
  state.ricochetSparks.push(s);
}

function firstHit(state: GameState, p: RicochetProjectile): Enemy | null {
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (p.hitIds.includes(e.id)) continue;
    const dx = e.pos.x - p.pos.x;
    const dy = e.pos.y - p.pos.y;
    const r = e.radius + p.radius;
    if (dx * dx + dy * dy <= r * r) return e;
  }
  return null;
}

function nearestEnemy(state: GameState, x: number, y: number): Enemy | null {
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - x;
    const dy = e.pos.y - y;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD2) {
      best = e;
      bestD2 = d2;
    }
  }
  return best;
}

function nearestEnemyInRange(
  state: GameState,
  x: number,
  y: number,
  range: number,
  excludeIds: number[]
): Enemy | null {
  const r2 = range * range;
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (excludeIds.includes(e.id)) continue;
    const dx = e.pos.x - x;
    const dy = e.pos.y - y;
    const d2 = dx * dx + dy * dy;
    if (d2 <= r2 && d2 < bestD2) {
      best = e;
      bestD2 = d2;
    }
  }
  return best;
}
