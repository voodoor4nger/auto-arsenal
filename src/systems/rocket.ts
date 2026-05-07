import type { GameState } from "../game";
import type { Enemy, RocketLauncherWeapon, Rocket } from "../types";
import { EVOLUTIONS, HOMING_MAX_TURN_RATE, WEAPONS } from "../constants";
import { findRocketLauncherWeapon } from "../weapons";
import { dealDamage } from "../damage";
import { pickPrimaryTarget } from "../targeting";

export function updateRockets(state: GameState, dt: number): void {
  const w = findRocketLauncherWeapon(state);
  if (w) {
    if (w.cooldownRemaining > 0) {
      w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    } else if (w.fireRate > 0) {
      const target = w.isPrimary
        ? pickPrimaryTarget(state)
        : nearestEnemy(state, state.player.pos.x, state.player.pos.y);
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

    if (r.homingStrength > 0) {
      const tgt = nearestEnemy(state, r.pos.x, r.pos.y);
      if (tgt) steerToward(r.vel, tgt.pos.x - r.pos.x, tgt.pos.y - r.pos.y, r.homingStrength, dt);
    }

    r.prevPos.x = r.pos.x;
    r.prevPos.y = r.pos.y;
    r.pos.x += r.vel.x * dt;
    r.pos.y += r.vel.y * dt;

    if (r.splitDistance > 0) {
      r.splitTimer -= dt;
      const odx = r.pos.x - r.originX;
      const ody = r.pos.y - r.originY;
      if (odx * odx + ody * ody >= r.splitDistance * r.splitDistance || r.splitTimer <= 0) {
        spawnSubRockets(state, r);
        r.alive = false;
      }
      continue;
    }

    r.ttl -= dt;
    if (r.ttl <= 0) {
      detonate(state, r, null);
      continue;
    }

    const hit = firstEnemyOverlap(state, r);
    if (hit) detonate(state, r, hit);
  }
}

function spawnSubRockets(state: GameState, parent: Rocket): void {
  const baseAngle = Math.atan2(parent.vel.y, parent.vel.x);
  const speed = Math.hypot(parent.vel.x, parent.vel.y) || WEAPONS.ROCKET.SPEED;
  const subDmgMult = EVOLUTIONS.ROCKET.SUB_DAMAGE_MULT;
  const subRadiusMult = EVOLUTIONS.ROCKET.SUB_RADIUS_MULT;
  for (const deg of EVOLUTIONS.ROCKET.SUB_ANGLES_DEG) {
    const angle = baseAngle + (deg * Math.PI) / 180;
    state.rockets.push({
      kind: "rocket",
      id: state.nextEntityId++,
      pos: { x: parent.pos.x, y: parent.pos.y },
      prevPos: { x: parent.pos.x, y: parent.pos.y },
      vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
      radius: WEAPONS.ROCKET.RADIUS * EVOLUTIONS.ROCKET.SUB_RENDER_RADIUS_MULT,
      alive: true,
      impactDamage: parent.impactDamage * subDmgMult,
      explosionDamage: parent.explosionDamage * subDmgMult,
      explosionRadius: parent.explosionRadius * subRadiusMult,
      ttl: WEAPONS.ROCKET.LIFETIME,
      exploded: false,
      explosionTtl: 0,
      originX: parent.pos.x,
      originY: parent.pos.y,
      splitDistance: 0,
      splitTimer: 0,
      homingStrength: EVOLUTIONS.ROCKET.SUB_HOMING,
    });
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

function steerToward(
  vel: { x: number; y: number },
  dx: number,
  dy: number,
  strength: number,
  dt: number
): void {
  const targetAngle = Math.atan2(dy, dx);
  const currentAngle = Math.atan2(vel.y, vel.x);
  let delta = targetAngle - currentAngle;
  if (delta > Math.PI) delta -= Math.PI * 2;
  else if (delta < -Math.PI) delta += Math.PI * 2;
  const maxTurn = HOMING_MAX_TURN_RATE * strength * dt;
  const turn = Math.max(-maxTurn, Math.min(maxTurn, delta));
  const newAngle = currentAngle + turn;
  const speed = Math.hypot(vel.x, vel.y);
  vel.x = Math.cos(newAngle) * speed;
  vel.y = Math.sin(newAngle) * speed;
}

function spawnRocket(
  state: GameState,
  w: RocketLauncherWeapon,
  target: Enemy
): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const len = Math.hypot(dx, dy) || 1;
  const evolved = w.evolved;
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
    originX: px,
    originY: py,
    splitDistance: evolved ? EVOLUTIONS.ROCKET.SPLIT_DISTANCE : 0,
    splitTimer: evolved ? EVOLUTIONS.ROCKET.SPLIT_TIME : 0,
    homingStrength: 0,
  });
}
