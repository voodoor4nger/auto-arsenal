import type { GameState } from "../game";
import type { Gem } from "../types";
import { GEM_RADIUS, GEM_XP_VALUE, SCRAP_PER_KILL } from "../constants";

export function updateDeathDrops(state: GameState): void {
  for (const e of state.enemies) {
    if (e.alive) continue;
    state.killCount += 1;
    state.player.runScrap += SCRAP_PER_KILL;
    state.gems.push(makeGem(state, e.pos.x, e.pos.y));
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
  };
}
