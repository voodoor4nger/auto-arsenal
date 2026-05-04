import type { GameState } from "./game";
import type { Enemy } from "./types";

export function dealDamage(state: GameState, enemy: Enemy, base: number): void {
  enemy.hp -= base * state.player.globalDamageMult;
  if (enemy.hp <= 0) enemy.alive = false;
}
