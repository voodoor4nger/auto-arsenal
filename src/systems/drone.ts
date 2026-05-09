import type { GameState } from "../game";
import type { Drone, DroneWeapon, Enemy, Projectile } from "../types";
import { EVOLUTIONS, WEAPONS } from "../constants";
import { findDroneWeapon } from "../weapons";

export function updateDrones(state: GameState, dt: number): void {
  const w = findDroneWeapon(state);
  if (!w) {
    if (state.drones.length > 0) state.drones = [];
    return;
  }

  syncDroneCount(state, w);
  if (state.drones.length === 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const orbitBase = (state.time * EVOLUTIONS.DRONE.ORBIT_SPEED) % (Math.PI * 2);

  for (let i = 0; i < state.drones.length; i++) {
    const d = state.drones[i];
    updateTargetOffset(d, w, i, state.drones.length, orbitBase);

    d.prevPos.x = d.pos.x;
    d.prevPos.y = d.pos.y;

    const desiredX = px + d.targetOffset.x;
    const desiredY = py + d.targetOffset.y;
    d.pos.x += (desiredX - d.pos.x) * WEAPONS.DRONE.FOLLOW_LERP;
    d.pos.y += (desiredY - d.pos.y) * WEAPONS.DRONE.FOLLOW_LERP;
    d.bobPhase += dt;

    if (w.evolved) {
      d.trailHistory.push({
        x: d.pos.x,
        y: d.pos.y,
        ttl: WEAPONS.DRONE.TRAIL_TTL,
        ttlMax: WEAPONS.DRONE.TRAIL_TTL,
      });
      for (const t of d.trailHistory) t.ttl -= dt;
      while (d.trailHistory.length > 0 && d.trailHistory[0].ttl <= 0) {
        d.trailHistory.shift();
      }
    } else if (d.trailHistory.length > 0) {
      d.trailHistory.length = 0;
    }

    d.fireCooldown -= dt;
    if (d.fireCooldown > 0) continue;
    if (w.droneFireRate <= 0) continue;

    const target = nearestEnemyInRange(state, d.pos.x, d.pos.y, w.droneRange);
    if (!target) continue;

    fireDroneProjectile(state, d, w, target);
    d.fireCooldown = 1 / w.droneFireRate;
  }
}

function syncDroneCount(state: GameState, w: DroneWeapon): void {
  while (state.drones.length < w.droneCount) {
    state.drones.push(makeDrone(state));
  }
  while (state.drones.length > w.droneCount) {
    state.drones.pop();
  }
}

function makeDrone(state: GameState): Drone {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  return {
    kind: "drone",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: { x: 0, y: 0 },
    radius: WEAPONS.DRONE.BODY_RADIUS,
    alive: true,
    targetOffset: { x: WEAPONS.DRONE.FOLLOW_OFFSET, y: 0 },
    fireCooldown: 0,
    bobPhase: Math.random() * WEAPONS.DRONE.BOB_PERIOD,
    lastFireAngle: 0,
    trailHistory: [],
  };
}

function updateTargetOffset(
  d: Drone,
  w: DroneWeapon,
  index: number,
  total: number,
  orbitBase: number
): void {
  if (w.evolved) {
    const angle = orbitBase + (index * Math.PI * 2) / total;
    d.targetOffset.x = Math.cos(angle) * EVOLUTIONS.DRONE.ORBIT_RADIUS;
    d.targetOffset.y = Math.sin(angle) * EVOLUTIONS.DRONE.ORBIT_RADIUS;
    return;
  }
  if (total <= 1) {
    d.targetOffset.x = w.droneFollowOffset;
    d.targetOffset.y = 0;
    return;
  }
  // 2 drones flank player on x-axis
  d.targetOffset.x = index === 0 ? w.droneFollowOffset : -w.droneFollowOffset;
  d.targetOffset.y = 0;
}

function fireDroneProjectile(
  state: GameState,
  d: Drone,
  w: DroneWeapon,
  target: Enemy
): void {
  const dx = target.pos.x - d.pos.x;
  const dy = target.pos.y - d.pos.y;
  const len = Math.hypot(dx, dy) || 1;
  const speed = w.droneProjectileSpeed;
  const ux = dx / len;
  const uy = dy / len;
  d.lastFireAngle = Math.atan2(uy, ux);

  const proj: Projectile = {
    kind: "projectile",
    id: state.nextEntityId++,
    pos: { x: d.pos.x, y: d.pos.y },
    prevPos: { x: d.pos.x, y: d.pos.y },
    vel: { x: ux * speed, y: uy * speed },
    radius: WEAPONS.DRONE.PROJECTILE_RADIUS,
    alive: true,
    damage: w.droneDamage,
    ttl: WEAPONS.DRONE.PROJECTILE_LIFETIME,
    pierceRemaining: 0,
    hitIds: [],
    homingStrength: 0,
    color: WEAPONS.DRONE.PROJECTILE_COLOR,
  };
  state.projectiles.push(proj);
}

function nearestEnemyInRange(
  state: GameState,
  x: number,
  y: number,
  range: number
): Enemy | null {
  const r2 = range * range;
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
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
