import type { GameState } from "../game";
import type { Enemy } from "../types";
import { WEAPONS } from "../constants";
import { findLightningWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateLightning(state: GameState, dt: number): void {
  for (const b of state.lightningBolts) b.ttl -= dt;
  if (state.lightningBolts.some((b) => b.ttl <= 0)) {
    state.lightningBolts = state.lightningBolts.filter((b) => b.ttl > 0);
  }

  const w = findLightningWeapon(state);
  if (!w) return;

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }
  if (w.cooldownRemaining > 0) return;
  if (w.fireRate <= 0) return;

  const first = nearestEnemy(state, state.player.pos.x, state.player.pos.y, new Set());
  if (!first) return;

  const points: { x: number; y: number }[] = [
    { x: state.player.pos.x, y: state.player.pos.y },
    { x: first.pos.x, y: first.pos.y },
  ];
  const hit = new Set<number>([first.id]);
  let dmg = w.damage;
  dealDamage(state, first, dmg);

  let lastPos = first.pos;
  for (let i = 0; i < w.chainCount; i++) {
    dmg *= WEAPONS.LIGHTNING.DAMAGE_FALLOFF;
    const next = nearestEnemyInRange(state, lastPos.x, lastPos.y, w.chainRange, hit);
    if (!next) break;
    dealDamage(state, next, dmg);
    hit.add(next.id);
    points.push({ x: next.pos.x, y: next.pos.y });
    lastPos = next.pos;
  }

  state.lightningBolts.push({
    points,
    ttl: WEAPONS.LIGHTNING.BOLT_TTL,
    ttlMax: WEAPONS.LIGHTNING.BOLT_TTL,
  });
  w.cooldownRemaining = 1 / w.fireRate;
}

function nearestEnemy(
  state: GameState,
  x: number,
  y: number,
  exclude: Set<number>
): Enemy | null {
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (exclude.has(e.id)) continue;
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
  exclude: Set<number>
): Enemy | null {
  const r2 = range * range;
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (exclude.has(e.id)) continue;
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
