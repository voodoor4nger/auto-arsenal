import type { GameState } from "../game";
import type { Enemy, GravityWell, RepulsorWeapon } from "../types";
import {
  REPULSOR_SHOVE_DURATION,
  SINGULARITY_DURATION,
  SINGULARITY_FADE_DURATION,
  SINGULARITY_MAX_RANGE,
  SINGULARITY_PULL_STRENGTH,
  SINGULARITY_TICK_RATE,
  SINGULARITY_TRAVEL_SPEED,
  WEAPONS,
} from "../constants";
import { findRepulsorWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateRepulsor(state: GameState, dt: number): void {
  const w = findRepulsorWeapon(state);
  if (!w) return;

  if (w.pulseVizTtl > 0) w.pulseVizTtl = Math.max(0, w.pulseVizTtl - dt);

  w.pulseCooldown -= dt;
  if (w.pulseCooldown > 0) return;

  if (w.evolved) {
    launchSingularity(state, w);
  } else {
    firePulse(state, w);
  }

  w.pulseCooldown += w.pulseRate > 0 ? 1 / w.pulseRate : 1;
  if (w.pulseCooldown < 0) w.pulseCooldown = 1 / w.pulseRate;
}

function firePulse(state: GameState, w: RepulsorWeapon): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const r2 = w.radius * w.radius;
  const shoveSpeed = w.pushDistance / REPULSOR_SHOVE_DURATION;

  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 > r2) continue;

    dealDamage(state, e, w.damage);
    if (!e.alive) continue;

    const d = Math.sqrt(d2);
    if (d < 0.0001) continue;
    const inv = 1 / d;
    e.shoveVelocity.x = (dx * inv) * shoveSpeed;
    e.shoveVelocity.y = (dy * inv) * shoveSpeed;
    e.shoveTimer = REPULSOR_SHOVE_DURATION;
  }

  w.pulseVizRadius = w.radius;
  w.pulseVizTtl = WEAPONS.REPULSOR.VIZ_DURATION;
}

function launchSingularity(state: GameState, w: RepulsorWeapon): void {
  const target = nearestEnemy(state);
  if (!target) {
    // No target -> roll cooldown forward but don't launch.
    return;
  }
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const dist = Math.hypot(dx, dy) || 1;
  const travelDistance = Math.min(dist, SINGULARITY_MAX_RANGE);
  const ux = dx / dist;
  const uy = dy / dist;
  const targetX = px + ux * travelDistance;
  const targetY = py + uy * travelDistance;

  const pullBonus = w.pushDistance - WEAPONS.REPULSOR.PUSH_DISTANCE;
  const pullStrength = SINGULARITY_PULL_STRENGTH + Math.max(0, pullBonus);

  const well: GravityWell = {
    kind: "gravityWell",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: { x: ux * SINGULARITY_TRAVEL_SPEED, y: uy * SINGULARITY_TRAVEL_SPEED },
    radius: w.radius,
    alive: true,
    phase: "flying",
    travelTarget: { x: targetX, y: targetY },
    travelDistance,
    travelTraveled: 0,
    damage: w.damage,
    pullStrength,
    ttl: SINGULARITY_DURATION,
    fadeTtl: SINGULARITY_FADE_DURATION,
    tickCooldown: 0,
    tickInterval: 1 / SINGULARITY_TICK_RATE,
  };
  state.gravityWells.push(well);
}

export function updateGravityWells(state: GameState, dt: number): void {
  if (state.gravityWells.length === 0) return;

  for (const well of state.gravityWells) {
    if (!well.alive) continue;

    if (well.phase === "flying") {
      well.prevPos.x = well.pos.x;
      well.prevPos.y = well.pos.y;
      const stepX = well.vel.x * dt;
      const stepY = well.vel.y * dt;
      well.pos.x += stepX;
      well.pos.y += stepY;
      well.travelTraveled += Math.hypot(stepX, stepY);
      if (well.travelTraveled >= well.travelDistance) {
        well.pos.x = well.travelTarget.x;
        well.pos.y = well.travelTarget.y;
        well.prevPos.x = well.pos.x;
        well.prevPos.y = well.pos.y;
        well.vel.x = 0;
        well.vel.y = 0;
        well.phase = "active";
      }
      continue;
    }

    if (well.phase === "active") {
      well.ttl -= dt;
      if (well.ttl <= 0) {
        well.phase = "fading";
        continue;
      }

      well.tickCooldown -= dt;
      const fireTick = well.tickCooldown <= 0;
      if (fireTick) well.tickCooldown += well.tickInterval;

      const r2 = well.radius * well.radius;
      for (const e of state.enemies) {
        if (!e.alive) continue;
        const dx = well.pos.x - e.pos.x;
        const dy = well.pos.y - e.pos.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > r2) continue;

        const d = Math.sqrt(d2);
        if (d > 0.0001) {
          const inv = 1 / d;
          // Strong pull at edge (distance/radius), tapering to zero at center
          // so enemies decelerate as they arrive instead of oscillating.
          const factor = Math.min(1, d / well.radius);
          const vx = dx * inv * well.pullStrength * factor;
          const vy = dy * inv * well.pullStrength * factor;
          e.pos.x += vx * dt;
          e.pos.y += vy * dt;
        }

        if (fireTick) dealDamage(state, e, well.damage);
      }
      continue;
    }

    if (well.phase === "fading") {
      well.fadeTtl -= dt;
      if (well.fadeTtl <= 0) well.alive = false;
    }
  }
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
