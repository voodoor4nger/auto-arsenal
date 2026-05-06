import type { GameState } from "../game";
import type { Orb } from "../types";
import { EVOLUTIONS, ORB_HIT_COOLDOWN, ORB_RADIUS } from "../constants";
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
  const now = state.time;
  for (let i = 0; i < n; i++) {
    const orb = state.orbs[i];
    const angle = w.baseAngle + (Math.PI * 2 * i) / n;
    orb.prevPos.x = orb.pos.x;
    orb.prevPos.y = orb.pos.y;
    orb.pos.x = px + Math.cos(angle) * w.orbitRadius;
    orb.pos.y = py + Math.sin(angle) * w.orbitRadius;
    if (w.evolved) {
      orb.trailHistory.push({ x: orb.pos.x, y: orb.pos.y, t: now });
      const cutoff = now - EVOLUTIONS.ORB.TRAIL_DURATION;
      while (orb.trailHistory.length > 0 && orb.trailHistory[0].t < cutoff) {
        orb.trailHistory.shift();
      }
    } else if (orb.trailHistory.length > 0) {
      orb.trailHistory.length = 0;
    }
  }

  applyHits(state, w.damage, w.evolved);
}

function applyHits(state: GameState, damage: number, evolved: boolean): void {
  const now = state.time;
  const trailDamage = damage * EVOLUTIONS.ORB.TRAIL_DAMAGE_MULT;
  for (const orb of state.orbs) {
    for (const e of state.enemies) {
      if (!e.alive) continue;
      const lastHit = orb.lastHitByEnemy.get(e.id);
      if (lastHit !== undefined && now - lastHit < ORB_HIT_COOLDOWN) continue;

      const r = e.radius + orb.radius;
      const dx = e.pos.x - orb.pos.x;
      const dy = e.pos.y - orb.pos.y;
      if (dx * dx + dy * dy <= r * r) {
        dealDamage(state, e, damage);
        orb.lastHitByEnemy.set(e.id, now);
        continue;
      }

      if (!evolved) continue;
      // Trail damage: any trail sample within hit radius counts as a touch.
      let hit = false;
      for (let h = 0; h < orb.trailHistory.length; h++) {
        const p = orb.trailHistory[h];
        const tdx = e.pos.x - p.x;
        const tdy = e.pos.y - p.y;
        if (tdx * tdx + tdy * tdy <= r * r) {
          hit = true;
          break;
        }
      }
      if (hit) {
        dealDamage(state, e, trailDamage);
        orb.lastHitByEnemy.set(e.id, now);
      }
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
    trailHistory: [],
  };
}
