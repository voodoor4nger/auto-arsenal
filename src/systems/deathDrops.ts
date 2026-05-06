import type { GameState } from "../game";
import type { Gem, Pickup, PickupType } from "../types";
import {
  GEM_RADIUS,
  GEM_XP_VALUE,
  PICKUP_DROP_CHANCE,
  PICKUP_RADIUS,
  PICKUP_TYPES,
  SCRAP_PER_KILL,
} from "../constants";

export function updateDeathDrops(state: GameState): void {
  for (const e of state.enemies) {
    if (e.alive) continue;
    state.killCount += 1;
    if (!e.dropsLoot) continue;

    state.player.runScrap += SCRAP_PER_KILL;
    state.gems.push(makeGem(state, e.pos.x, e.pos.y));

    if (Math.random() < PICKUP_DROP_CHANCE) {
      state.pickups.push(makePickup(state, e.pos.x, e.pos.y));
    }
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
    value: GEM_XP_VALUE,
    magnetized: false,
  };
}

function makePickup(state: GameState, x: number, y: number): Pickup {
  const type: PickupType = PICKUP_TYPES[Math.floor(Math.random() * PICKUP_TYPES.length)];
  return {
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
}
