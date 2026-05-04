import type { GameState } from "./game";
import type { Enemy } from "./types";
import {
  BERSERKER_HP_THRESHOLD,
  BERSERKER_STACK,
  CRIT_FLASH_DURATION,
} from "./constants";

export function dealDamage(state: GameState, enemy: Enemy, base: number): void {
  const p = state.player;
  let dmg = base;

  const isCrit = p.critChance > 0 && Math.random() < p.critChance;
  if (isCrit) dmg *= p.critMult;

  if (p.maxHp > 0 && p.hp / p.maxHp < BERSERKER_HP_THRESHOLD) {
    dmg *= 1 + p.berserkerStacks * BERSERKER_STACK;
  }

  dmg *= p.globalDamageMult;

  enemy.hp -= dmg;
  if (enemy.hp <= 0) {
    enemy.alive = false;
    return;
  }

  if (isCrit) enemy.critFlashTtl = CRIT_FLASH_DURATION;
}
