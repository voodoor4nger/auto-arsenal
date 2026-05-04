import type { GameState } from "../game";
import type { Orb } from "../types";
import { ORB_HIT_COOLDOWN, ORB_ORBIT_RADIUS, ORB_RADIUS } from "../constants";
import { findOrbWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateOrbs(state: GameState, dt: number): void {
  const w = findOrbWeapon(state);
  if (!w) {
    if (state.orbs.length > 0) state.orbs = [];
    return;
  }

  while (state.orbs.length < w.orbCount) state.orbs.push(makeOrb(state));
  while (state.orbs.length > w.orbCount) state.orbs.pop();

  w.baseAngle = (w.baseAngle + w.rotationSpeed * dt) % (Math.PI * 2);

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const n = state.orbs.length;
  for (let i = 0; i < n; i++) {
    const orb = state.orbs[i];
    const angle = w.baseAngle + (Math.PI * 2 * i) / n;
    orb.prevPos.x = orb.pos.x;
    orb.prevPos.y = orb.pos.y;
    orb.pos.x = px + Math.cos(angle) * ORB_ORBIT_RADIUS;
    orb.pos.y = py + Math.sin(angle) * ORB_ORBIT_RADIUS;
  }

  applyHits(state, w.damage);
}

function applyHits(state: GameState, damage: number): void {
  const now = state.time;
  for (const orb of state.orbs) {
    for (const e of state.enemies) {
      if (!e.alive) continue;
      const dx = e.pos.x - orb.pos.x;
      const dy = e.pos.y - orb.pos.y;
      const r = e.radius + orb.radius;
      if (dx * dx + dy * dy > r * r) continue;

      const lastHit = orb.lastHitByEnemy.get(e.id);
      if (lastHit !== undefined && now - lastHit < ORB_HIT_COOLDOWN) continue;

      dealDamage(state, e, damage);
      orb.lastHitByEnemy.set(e.id, now);
    }
    pruneHitMap(orb, now);
  }
}

function pruneHitMap(orb: Orb, now: number): void {
  for (const [id, t] of orb.lastHitByEnemy) {
    if (now - t >= ORB_HIT_COOLDOWN) orb.lastHitByEnemy.delete(id);
  }
}

function makeOrb(state: GameState): Orb {
  return {
    kind: "orb",
    id: state.nextEntityId++,
    pos: { x: state.player.pos.x, y: state.player.pos.y },
    prevPos: { x: state.player.pos.x, y: state.player.pos.y },
    vel: { x: 0, y: 0 },
    radius: ORB_RADIUS,
    alive: true,
    lastHitByEnemy: new Map(),
  };
}
