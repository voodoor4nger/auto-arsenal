import type { GameState } from "../game";
import type { Enemy, Gem, Pickup, PickupType } from "../types";
import {
  BOSS_GEM_DROPS,
  BOSS_GEM_SPREAD,
  BOSS_SCRAP_BASE,
  BOSS_SCRAP_PER_WINDOW,
  BRUTE_GEM_DROPS,
  BRUTE_GEM_SPREAD,
  GEM_RADIUS,
  PICKUP_DROP_CHANCE,
  PICKUP_RADIUS,
  PICKUP_TYPES,
  SCRAP_BAG_VALUE_MAX,
  SCRAP_BAG_VALUE_MIN,
  SCRAP_PER_KILL,
  TREASURE_CHEST_RADIUS,
  XP,
} from "../constants";

export function gemValueForTime(timeSeconds: number): number {
  const minutes = timeSeconds / 60;
  const tier = Math.floor(minutes / XP.GEM_VALUE_MINUTES_PER_TIER);
  return Math.min(XP.GEM_VALUE_MAX, XP.GEM_VALUE_BASE + tier);
}

export function updateDeathDrops(state: GameState): void {
  for (const e of state.enemies) {
    if (e.alive) continue;
    state.killCount += 1;
    if (e.species === "brute") state.brutesKilled += 1;
    const typeKey = e.species === "chaser" ? "basic" : e.species;
    state.killsByType[typeKey] = (state.killsByType[typeKey] ?? 0) + 1;
    if (!e.dropsLoot) continue;

    if (e.species === "boss_brute_lord") {
      grantBossRewards(state, e);
      continue;
    }

    state.player.runScrap += SCRAP_PER_KILL;

    const gemCount = e.species === "brute" ? BRUTE_GEM_DROPS : 1;
    if (gemCount === 1) {
      state.gems.push(makeGem(state, e.pos.x, e.pos.y));
    } else {
      for (let i = 0; i < gemCount; i++) {
        const angle = (Math.PI * 2 * i) / gemCount + Math.random() * 0.4;
        const r = BRUTE_GEM_SPREAD;
        state.gems.push(
          makeGem(state, e.pos.x + Math.cos(angle) * r, e.pos.y + Math.sin(angle) * r)
        );
      }
    }

    if (Math.random() < PICKUP_DROP_CHANCE) {
      state.pickups.push(makePickup(state, e.pos.x, e.pos.y));
    }
  }
}

function grantBossRewards(state: GameState, e: Enemy & { species: "boss_brute_lord" }): void {
  state.player.runScrap += BOSS_SCRAP_BASE + BOSS_SCRAP_PER_WINDOW * e.windowIndex;
  state.pickups.push(makeTreasureChest(state, e.pos.x, e.pos.y));
  for (let i = 0; i < BOSS_GEM_DROPS; i++) {
    const angle = (Math.PI * 2 * i) / BOSS_GEM_DROPS + Math.random() * 0.4;
    const r = BOSS_GEM_SPREAD;
    state.gems.push(
      makeGem(state, e.pos.x + Math.cos(angle) * r, e.pos.y + Math.sin(angle) * r)
    );
  }
}

function makeGem(state: GameState, x: number, y: number): Gem {
  return {
    kind: "gem",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: GEM_RADIUS,
    alive: true,
    value: gemValueForTime(state.time),
    magnetized: false,
  };
}

function makePickup(state: GameState, x: number, y: number): Pickup {
  const type: PickupType = PICKUP_TYPES[Math.floor(Math.random() * PICKUP_TYPES.length)];
  const pickup: Pickup = {
    kind: "pickup",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: PICKUP_RADIUS,
    alive: true,
    pickupType: type,
    spawnTime: state.time,
  };
  if (type === "scrap_bag") {
    const range = SCRAP_BAG_VALUE_MAX - SCRAP_BAG_VALUE_MIN + 1;
    pickup.scrapValue = SCRAP_BAG_VALUE_MIN + Math.floor(Math.random() * range);
  }
  return pickup;
}

function makeTreasureChest(state: GameState, x: number, y: number): Pickup {
  return {
    kind: "pickup",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: TREASURE_CHEST_RADIUS,
    alive: true,
    pickupType: "treasure_chest",
    spawnTime: state.time,
  };
}
