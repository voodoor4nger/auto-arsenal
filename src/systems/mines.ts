import type { GameState } from "../game";
import type { Mine } from "../types";
import { EVOLUTIONS, WEAPONS } from "../constants";
import { findMinesWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updatePlasmaFields(state: GameState, dt: number): void {
  if (state.plasmaFields.length === 0) return;
  for (const f of state.plasmaFields) {
    f.ttl -= dt;
    if (f.ttl <= 0) continue;
    f.tickCooldown -= dt;
    if (f.tickCooldown > 0) continue;
    const r2 = f.radius * f.radius;
    for (const e of state.enemies) {
      if (!e.alive) continue;
      const dx = e.pos.x - f.pos.x;
      const dy = e.pos.y - f.pos.y;
      if (dx * dx + dy * dy > r2) continue;
      dealDamage(state, e, f.perTickDamage);
    }
    f.tickCooldown += f.tickInterval;
  }
  if (state.plasmaFields.some((f) => f.ttl <= 0)) {
    state.plasmaFields = state.plasmaFields.filter((f) => f.ttl > 0);
  }
}

export function updateMines(state: GameState, dt: number): void {
  const w = findMinesWeapon(state);
  if (w) {
    if (w.cooldownRemaining > 0) {
      w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    } else if (w.fireRate > 0) {
      dropMine(state, w.damage, w.triggerRadius, w.explosionRadius);
      w.cooldownRemaining = 1 / w.fireRate;
    }
  } else if (state.mines.length === 0) {
    return;
  }

  for (const m of state.mines) {
    if (!m.alive) continue;

    if (m.exploded) {
      m.explosionTtl -= dt;
      if (m.explosionTtl <= 0) m.alive = false;
      continue;
    }

    if (m.armTimer > 0) {
      m.armTimer = Math.max(0, m.armTimer - dt);
      continue;
    }

    if (tryTrigger(state, m)) detonate(state, m);
  }
}

function tryTrigger(state: GameState, m: Mine): boolean {
  const tr2 = m.triggerRadius * m.triggerRadius;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - m.pos.x;
    const dy = e.pos.y - m.pos.y;
    if (dx * dx + dy * dy <= tr2) return true;
  }
  return false;
}

function detonate(state: GameState, m: Mine): void {
  const er2 = m.explosionRadius * m.explosionRadius;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - m.pos.x;
    const dy = e.pos.y - m.pos.y;
    if (dx * dx + dy * dy <= er2) {
      dealDamage(state, e, m.damage);
    }
  }
  m.exploded = true;
  m.explosionTtl = WEAPONS.MINES.EXPLOSION_TTL;

  const w = findMinesWeapon(state);
  if (w && w.evolved) {
    state.plasmaFields.push({
      pos: { x: m.pos.x, y: m.pos.y },
      radius: m.explosionRadius * EVOLUTIONS.MINES.FIELD_RADIUS_MULT,
      ttl: EVOLUTIONS.MINES.FIELD_DURATION,
      ttlMax: EVOLUTIONS.MINES.FIELD_DURATION,
      tickCooldown: EVOLUTIONS.MINES.FIELD_TICK_INTERVAL,
      tickInterval: EVOLUTIONS.MINES.FIELD_TICK_INTERVAL,
      perTickDamage: m.damage * EVOLUTIONS.MINES.FIELD_DAMAGE_MULT,
    });
  }
}

function dropMine(
  state: GameState,
  damage: number,
  triggerRadius: number,
  explosionRadius: number
): void {
  if (state.mines.length >= WEAPONS.MINES.MAX_ACTIVE) {
    state.mines.shift();
  }
  state.mines.push({
    kind: "mine",
    id: state.nextEntityId++,
    pos: { x: state.player.pos.x, y: state.player.pos.y },
    prevPos: { x: state.player.pos.x, y: state.player.pos.y },
    vel: { x: 0, y: 0 },
    radius: WEAPONS.MINES.RADIUS,
    alive: true,
    damage,
    triggerRadius,
    explosionRadius,
    armTimer: WEAPONS.MINES.ARM_TIME,
    exploded: false,
    explosionTtl: 0,
  });
}
