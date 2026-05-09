import type { GameState } from "../game";
import type { EnemyProjectile } from "../types";
import {
  SHOOTER_FIRE_INTERVAL,
  SHOOTER_PROJ_DAMAGE,
  SHOOTER_PROJ_LIFETIME,
  SHOOTER_PROJ_RADIUS,
  SHOOTER_PROJ_SPEED,
  SHOOTER_RANGE,
} from "../constants";

export function updateEnemyShoot(state: GameState, dt: number): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const rangeSq = SHOOTER_RANGE * SHOOTER_RANGE;

  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (e.species !== "shooter") continue;

    const dx = px - e.pos.x;
    const dy = py - e.pos.y;
    const inRange = dx * dx + dy * dy <= rangeSq;
    if (!inRange) continue;

    e.fireCooldown -= dt;
    if (e.fireCooldown > 0) continue;

    state.enemyProjectiles.push(makeShot(state, e.pos.x, e.pos.y, dx, dy));
    e.fireCooldown = SHOOTER_FIRE_INTERVAL;
  }
}

function makeShot(
  state: GameState,
  ox: number,
  oy: number,
  dx: number,
  dy: number
): EnemyProjectile {
  const len = Math.hypot(dx, dy) || 1;
  const inv = 1 / len;
  return {
    kind: "enemyProjectile",
    id: state.nextEntityId++,
    pos: { x: ox, y: oy },
    prevPos: { x: ox, y: oy },
    vel: { x: dx * inv * SHOOTER_PROJ_SPEED, y: dy * inv * SHOOTER_PROJ_SPEED },
    radius: SHOOTER_PROJ_RADIUS,
    alive: true,
    damage: SHOOTER_PROJ_DAMAGE,
    ttl: SHOOTER_PROJ_LIFETIME,
    source: "shooter",
  };
}
