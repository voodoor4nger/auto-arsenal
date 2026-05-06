import type { GameState } from "../game";
import type { Boomerang, Enemy } from "../types";
import { EVOLUTIONS, WEAPONS } from "../constants";
import { findBoomerangWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateBoomerangs(state: GameState, dt: number): void {
  const w = findBoomerangWeapon(state);
  if (w) {
    if (w.cooldownRemaining > 0) {
      w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    } else if (w.fireRate > 0) {
      const target = nearestEnemy(state, state.player.pos.x, state.player.pos.y);
      if (target) {
        spawnBoomerang(
          state,
          w.damage,
          w.range,
          target,
          w.evolved ? EVOLUTIONS.BOOMERANG.TOTAL_LOBES : 1
        );
        w.cooldownRemaining = 1 / w.fireRate;
      }
    }
  } else if (state.boomerangs.length === 0) {
    return;
  }

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const now = state.time;

  for (const b of state.boomerangs) {
    if (!b.alive) continue;
    b.prevPos.x = b.pos.x;
    b.prevPos.y = b.pos.y;

    if (b.phase === "outgoing") {
      b.pos.x += b.vel.x * dt;
      b.pos.y += b.vel.y * dt;
      const odx = b.pos.x - b.origin.x;
      const ody = b.pos.y - b.origin.y;
      if (odx * odx + ody * ody >= b.range * b.range) {
        b.phase = "returning";
        b.lobe += 1;
        b.lastHitByEnemy.clear();
      }
    } else {
      const dx = px - b.pos.x;
      const dy = py - b.pos.y;
      const len = Math.hypot(dx, dy) || 1;
      b.vel.x = (dx / len) * b.speed;
      b.vel.y = (dy / len) * b.speed;
      b.pos.x += b.vel.x * dt;
      b.pos.y += b.vel.y * dt;
      if (len <= WEAPONS.BOOMERANG.CATCH_DISTANCE) {
        if (b.lobe < b.totalLobes) {
          // Caught at player; go through to opposite side for the next outbound lobe.
          const outAngle =
            b.lobe === 2 ? b.fireAngle + Math.PI : b.fireAngle;
          b.origin.x = px;
          b.origin.y = py;
          b.vel.x = Math.cos(outAngle) * b.speed;
          b.vel.y = Math.sin(outAngle) * b.speed;
          b.phase = "outgoing";
          b.lobe += 1;
          b.lastHitByEnemy.clear();
        } else {
          b.alive = false;
          continue;
        }
      }
    }

    applyHits(state, b, now);
  }
}

function applyHits(state: GameState, b: Boomerang, now: number): void {
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - b.pos.x;
    const dy = e.pos.y - b.pos.y;
    const r = e.radius + b.radius;
    if (dx * dx + dy * dy > r * r) continue;
    const last = b.lastHitByEnemy.get(e.id);
    if (last !== undefined && now - last < WEAPONS.BOOMERANG.HIT_COOLDOWN) continue;
    dealDamage(state, e, b.damage);
    b.lastHitByEnemy.set(e.id, now);
  }
  for (const [id, t] of b.lastHitByEnemy) {
    if (now - t >= WEAPONS.BOOMERANG.HIT_COOLDOWN) b.lastHitByEnemy.delete(id);
  }
}

function spawnBoomerang(
  state: GameState,
  damage: number,
  range: number,
  target: Enemy,
  totalLobes: number
): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const len = Math.hypot(dx, dy) || 1;
  const speed = WEAPONS.BOOMERANG.OUT_SPEED;
  const fireAngle = Math.atan2(dy, dx);

  state.boomerangs.push({
    kind: "boomerang",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: { x: (dx / len) * speed, y: (dy / len) * speed },
    radius: WEAPONS.BOOMERANG.RADIUS,
    alive: true,
    damage,
    origin: { x: px, y: py },
    range,
    speed,
    phase: "outgoing",
    lastHitByEnemy: new Map(),
    lobe: 1,
    totalLobes,
    fireAngle,
  });
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
