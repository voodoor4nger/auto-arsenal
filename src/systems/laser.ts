import type { GameState } from "../game";
import type { Enemy, LaserWeapon } from "../types";
import { SOLAR_BEAM_DPS_MULT, WEAPONS, WEAPON_RANGE } from "../constants";
import { findLaserWeapon } from "../weapons";
import { dealDamage } from "../damage";
import { pickPrimaryTarget, pickPrimaryTargets } from "../targeting";

export function updateLaser(state: GameState, dt: number): void {
  for (const beam of state.laserBeams) beam.ttl -= dt;
  if (state.laserBeams.some((b) => b.ttl <= 0)) {
    state.laserBeams = state.laserBeams.filter((b) => b.ttl > 0);
  }

  const w = findLaserWeapon(state);
  if (!w) return;

  if (w.evolved) {
    updateSolarBeam(state, w, dt);
    return;
  }

  if (w.cooldownRemaining > 0) {
    w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
  }
  if (w.cooldownRemaining > 0) return;
  if (w.fireRate <= 0) return;

  const targets = w.isPrimary
    ? pickPrimaryTargets(state, w.beamCount)
    : nearestEnemies(state, w.beamCount);
  if (targets.length === 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const reach = WEAPONS.LASER.BEAM_LENGTH;
  const halfWidth = w.beamWidth * 0.5;

  for (const t of targets) {
    const dx = t.pos.x - px;
    const dy = t.pos.y - py;
    const len = Math.hypot(dx, dy) || 1;
    const ex = px + (dx / len) * reach;
    const ey = py + (dy / len) * reach;

    state.laserBeams.push({
      start: { x: px, y: py },
      end: { x: ex, y: ey },
      ttl: WEAPONS.LASER.BEAM_TTL,
      ttlMax: WEAPONS.LASER.BEAM_TTL,
    });

    for (const e of state.enemies) {
      if (!e.alive) continue;
      const reach2 = (halfWidth + e.radius) * (halfWidth + e.radius);
      if (distSqPointSegment(e.pos.x, e.pos.y, px, py, ex, ey) > reach2) continue;
      dealDamage(state, e, w.damage);
    }
  }

  w.cooldownRemaining = 1 / w.fireRate;
}

function updateSolarBeam(state: GameState, w: LaserWeapon, dt: number): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const range2 = WEAPON_RANGE * WEAPON_RANGE;
  const enemyById = new Map<number, Enemy>();
  for (const e of state.enemies) enemyById.set(e.id, e);

  // Step 1: keep beams whose locked target is still alive and in range.
  const lockedIds = new Set<number>();
  const kept: { targetId: number; endX: number; endY: number }[] = [];
  for (const beam of w.beams) {
    const cur = enemyById.get(beam.targetId);
    if (!cur || !cur.alive) continue;
    const dx = cur.pos.x - px;
    const dy = cur.pos.y - py;
    if (dx * dx + dy * dy > range2) continue;
    beam.endX = cur.pos.x;
    beam.endY = cur.pos.y;
    kept.push(beam);
    lockedIds.add(beam.targetId);
  }

  // Step 2: pick fresh targets up to beamCount, excluding already-locked ids.
  while (kept.length < w.beamCount) {
    const fresh = w.isPrimary
      ? pickPrimaryTarget(state, WEAPON_RANGE, lockedIds)
      : nearestEnemyExcept(state, WEAPON_RANGE, lockedIds);
    if (!fresh) break;
    kept.push({ targetId: fresh.id, endX: fresh.pos.x, endY: fresh.pos.y });
    lockedIds.add(fresh.id);
  }

  w.beams = kept;
  if (w.beams.length === 0) return;

  // Step 3: damage every enemy whose body overlaps each beam's line.
  const halfWidth = w.beamWidth * 0.5;
  const continuousDps = w.damage * w.fireRate * SOLAR_BEAM_DPS_MULT;
  const perBeamFrameDamage = continuousDps * dt;
  for (const beam of w.beams) {
    for (const e of state.enemies) {
      if (!e.alive) continue;
      const reach = halfWidth + e.radius;
      if (distSqPointSegment(e.pos.x, e.pos.y, px, py, beam.endX, beam.endY) > reach * reach)
        continue;
      dealDamage(state, e, perBeamFrameDamage);
    }
  }
}

function nearestEnemyExcept(
  state: GameState,
  range: number,
  excluded: Set<number>
): Enemy | null {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const r2 = range * range;
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (excluded.has(e.id)) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 <= r2 && d2 < bestD2) {
      best = e;
      bestD2 = d2;
    }
  }
  return best;
}

function nearestEnemies(state: GameState, n: number): Enemy[] {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const candidates: { e: Enemy; d2: number }[] = [];
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    candidates.push({ e, d2: dx * dx + dy * dy });
  }
  candidates.sort((a, b) => a.d2 - b.d2);
  return candidates.slice(0, n).map((c) => c.e);
}

function distSqPointSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq < 1e-9) {
    const ex = px - ax;
    const ey = py - ay;
    return ex * ex + ey * ey;
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  const ex = px - cx;
  const ey = py - cy;
  return ex * ex + ey * ey;
}
