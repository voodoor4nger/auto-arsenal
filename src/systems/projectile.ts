import type { GameState } from "../game";
import type { Enemy } from "../types";
import { HOMING_MAX_TURN_RATE } from "../constants";
import { dealDamage } from "../damage";

export function updateProjectiles(state: GameState, dt: number): void {
  for (const p of state.projectiles) {
    if (!p.alive) continue;

    if (p.homingStrength > 0) {
      const target = nearestEnemy(state, p.pos.x, p.pos.y);
      if (target) steerToward(p.vel, target.pos.x - p.pos.x, target.pos.y - p.pos.y, p.homingStrength, dt);
    }

    p.prevPos.x = p.pos.x;
    p.prevPos.y = p.pos.y;
    p.pos.x += p.vel.x * dt;
    p.pos.y += p.vel.y * dt;

    p.ttl -= dt;
    if (p.ttl <= 0) {
      p.alive = false;
      continue;
    }

    for (const e of state.enemies) {
      if (!e.alive) continue;
      if (p.hitIds.includes(e.id)) continue;
      const dx = e.pos.x - p.pos.x;
      const dy = e.pos.y - p.pos.y;
      const r = e.radius + p.radius;
      if (dx * dx + dy * dy > r * r) continue;

      dealDamage(state, e, p.damage);
      p.hitIds.push(e.id);

      if (p.pierceRemaining <= 0) {
        p.alive = false;
        break;
      }
      p.pierceRemaining -= 1;
    }
  }
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
