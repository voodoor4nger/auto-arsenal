import type { GameState } from "../game";
import type { Bomber, Explosion } from "../types";
import {
  BOMBER_ARM_DURATION,
  BOMBER_EXPLODE_ENEMY_DMG,
  BOMBER_EXPLODE_PLAYER_DMG,
  BOMBER_EXPLODE_RADIUS,
  BOMBER_VIGNETTE_DURATION,
  EXPLOSION_RING_INNER,
  EXPLOSION_RING_OUTER,
  EXPLOSION_TTL,
} from "../constants";
import { dealDamage } from "../damage";
import { damagePlayer } from "./combat";

export function updateBombers(state: GameState, dt: number): void {
  const player = state.player;

  for (const e of state.enemies) {
    if (e.species !== "bomber") continue;
    if (e.detonated) continue;

    if (!e.alive) {
      detonateBomber(state, e);
      continue;
    }

    if (e.freezeTtl > 0) continue;

    const dx = e.pos.x - player.pos.x;
    const dy = e.pos.y - player.pos.y;
    const r = e.radius + player.radius;
    if (dx * dx + dy * dy <= r * r) {
      detonateBomber(state, e);
      continue;
    }

    if (e.armed && e.armedTimer >= BOMBER_ARM_DURATION) {
      detonateBomber(state, e);
    }
  }

  decayExplosions(state, dt);
  if (state.bomberVignetteTtl > 0) {
    state.bomberVignetteTtl = Math.max(0, state.bomberVignetteTtl - dt);
  }
}

function detonateBomber(state: GameState, b: Bomber): void {
  b.detonated = true;
  b.alive = false;

  const player = state.player;
  const pdx = b.pos.x - player.pos.x;
  const pdy = b.pos.y - player.pos.y;
  if (pdx * pdx + pdy * pdy <= BOMBER_EXPLODE_RADIUS * BOMBER_EXPLODE_RADIUS) {
    const hit = damagePlayer(state, BOMBER_EXPLODE_PLAYER_DMG, "bomber");
    if (hit) state.bomberVignetteTtl = BOMBER_VIGNETTE_DURATION;
  }

  const r2 = BOMBER_EXPLODE_RADIUS * BOMBER_EXPLODE_RADIUS;
  for (const other of state.enemies) {
    if (!other.alive) continue;
    if (other.id === b.id) continue;
    const odx = other.pos.x - b.pos.x;
    const ody = other.pos.y - b.pos.y;
    if (odx * odx + ody * ody > r2) continue;
    dealDamage(state, other, BOMBER_EXPLODE_ENEMY_DMG);
  }

  const explosion: Explosion = {
    pos: { x: b.pos.x, y: b.pos.y },
    radius: BOMBER_EXPLODE_RADIUS,
    ttl: EXPLOSION_TTL,
    ttlMax: EXPLOSION_TTL,
    innerColor: EXPLOSION_RING_INNER,
    outerColor: EXPLOSION_RING_OUTER,
    ringWidth: 4,
  };
  state.explosions.push(explosion);
}

function decayExplosions(state: GameState, dt: number): void {
  if (state.explosions.length === 0) return;
  for (const ex of state.explosions) ex.ttl -= dt;
  if (state.explosions.some((ex) => ex.ttl <= 0)) {
    state.explosions = state.explosions.filter((ex) => ex.ttl > 0);
  }
}
