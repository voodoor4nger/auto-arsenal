import type { GameState } from "../game";
import type { FloatingText, Pickup, PickupType } from "../types";
import {
  BOMB_FLASH_DURATION,
  BOMB_SHOCKWAVE_DURATION,
  CLOCK_FREEZE_DURATION,
  CLOCK_VIGNETTE_DURATION,
  FLOATING_TEXT_TTL,
  FLOATING_TEXT_VY,
  HEART_HEAL_PCT,
  HEART_VIGNETTE_DURATION,
  MAGNET_PULSE_DURATION,
  PICKUP_BOMB_DAMAGE,
  SCRAP_BAG_AMOUNT,
} from "../constants";

export function updatePickups(state: GameState, dt: number): void {
  // Floating text update.
  if (state.floatingTexts.length > 0) {
    for (const f of state.floatingTexts) {
      f.pos.y -= f.vy * dt;
      f.ttl -= dt;
    }
    if (state.floatingTexts.some((f) => f.ttl <= 0)) {
      state.floatingTexts = state.floatingTexts.filter((f) => f.ttl > 0);
    }
  }

  // Effect timers.
  if (state.bombFlashTtl > 0) state.bombFlashTtl = Math.max(0, state.bombFlashTtl - dt);
  if (state.bombShockwaveTtl > 0) state.bombShockwaveTtl = Math.max(0, state.bombShockwaveTtl - dt);
  if (state.magnetPulseTtl > 0) state.magnetPulseTtl = Math.max(0, state.magnetPulseTtl - dt);
  if (state.heartVignetteTtl > 0) state.heartVignetteTtl = Math.max(0, state.heartVignetteTtl - dt);
  if (state.clockTintTtl > 0) state.clockTintTtl = Math.max(0, state.clockTintTtl - dt);
  if (state.clockVignetteTtl > 0)
    state.clockVignetteTtl = Math.max(0, state.clockVignetteTtl - dt);

  // Collision.
  if (state.pickups.length === 0) return;
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const pr = state.player.radius;
  for (const pu of state.pickups) {
    if (!pu.alive) continue;
    const dx = pu.pos.x - px;
    const dy = pu.pos.y - py;
    const r = pu.radius + pr;
    if (dx * dx + dy * dy > r * r) continue;
    applyEffect(state, pu);
    pu.alive = false;
  }
}

function applyEffect(state: GameState, pu: Pickup): void {
  switch (pu.pickupType) {
    case "bomb":
      applyBomb(state);
      return;
    case "magnet":
      applyMagnet(state);
      return;
    case "heart":
      applyHeart(state);
      return;
    case "scrap_bag":
      applyScrapBag(state, pu);
      return;
    case "clock":
      applyClock(state);
      return;
    case "treasure_chest":
      applyTreasureChest(state);
      return;
  }
}

function applyTreasureChest(state: GameState): void {
  state.pendingChestRolls += 1;
}

function applyBomb(state: GameState): void {
  const halfW = state.viewport.width / 2;
  const halfH = state.viewport.height / 2;
  const minX = state.player.pos.x - halfW;
  const maxX = state.player.pos.x + halfW;
  const minY = state.player.pos.y - halfH;
  const maxY = state.player.pos.y + halfH;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (e.pos.x < minX || e.pos.x > maxX || e.pos.y < minY || e.pos.y > maxY) continue;
    e.dropsLoot = false;
    if (e.species === "bomber") e.detonated = true;
    e.hp -= PICKUP_BOMB_DAMAGE;
    if (e.hp <= 0) e.alive = false;
  }
  state.bombFlashTtl = BOMB_FLASH_DURATION;
  state.bombShockwaveTtl = BOMB_SHOCKWAVE_DURATION;
  state.bombShockwaveOriginX = state.player.pos.x;
  state.bombShockwaveOriginY = state.player.pos.y;
}

function applyMagnet(state: GameState): void {
  for (const g of state.gems) {
    if (!g.alive) continue;
    g.magnetized = true;
  }
  state.magnetPulseTtl = MAGNET_PULSE_DURATION;
}

function applyHeart(state: GameState): void {
  const p = state.player;
  const heal = Math.floor(p.maxHp * HEART_HEAL_PCT);
  const before = p.hp;
  p.hp = Math.min(p.maxHp, p.hp + heal);
  const actual = Math.round(p.hp - before);
  state.heartVignetteTtl = HEART_VIGNETTE_DURATION;
  pushFloat(state, `+${actual}`, p.pos.x, p.pos.y - 24, "#7ad36b");
}

function applyScrapBag(state: GameState, pu: Pickup): void {
  const amount = pu.scrapValue ?? SCRAP_BAG_AMOUNT;
  state.player.runScrap += amount;
  pushFloat(state, `+${amount} SCRAP`, pu.pos.x, pu.pos.y - 18, "#f5d76e");
}

function applyClock(state: GameState): void {
  for (const e of state.enemies) {
    if (!e.alive) continue;
    e.freezeTtl = CLOCK_FREEZE_DURATION;
    e.vel.x = 0;
    e.vel.y = 0;
  }
  state.clockTintTtl = CLOCK_FREEZE_DURATION;
  state.clockVignetteTtl = CLOCK_VIGNETTE_DURATION;
}

function pushFloat(
  state: GameState,
  text: string,
  x: number,
  y: number,
  color: string
): void {
  const f: FloatingText = {
    text,
    pos: { x, y },
    vy: FLOATING_TEXT_VY,
    ttl: FLOATING_TEXT_TTL,
    ttlMax: FLOATING_TEXT_TTL,
    color,
  };
  state.floatingTexts.push(f);
}

export function pushFloatingText(
  state: GameState,
  text: string,
  x: number,
  y: number,
  color: string
): void {
  pushFloat(state, text, x, y, color);
}

// Re-export so PickupType is available at this module's import surface
// (not strictly needed but lets future systems import it from here).
export type { PickupType };
